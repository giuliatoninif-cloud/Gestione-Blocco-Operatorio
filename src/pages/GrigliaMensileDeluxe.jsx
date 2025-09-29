import React, { useState } from "react";
import { useTema } from "../components/TemaProvider";
import stili from "../stili";
import "../styles/griglia.css";

function generaGiorniDelMese(mese, anno) {
  const giorni = [];
  const primoGiorno = new Date(anno, mese, 1);
  const offset = (primoGiorno.getDay() + 6) % 7;

  for (let i = 0; i < offset; i++) {
    giorni.push(null);
  }

  const ultimoGiorno = new Date(anno, mese + 1, 0).getDate();
  for (let i = 1; i <= ultimoGiorno; i++) {
    const giorno = new Date(anno, mese, i);
    giorno.setHours(12, 0, 0, 0); // ✅ blindatura oraria
    if (giorno.getDay() !== 0) {
      giorni.push(giorno);
    }
  }

  return giorni;
}


export default function GrigliaMensileDeluxe({ sedute, onModifica, onElimina, onAggiungi, setGiornoDaEsportare, }) {
  const oggi = new Date();
  const { tema } = useTema();

  const [meseCorrente, setMeseCorrente] = useState(oggi.getMonth());
  const [annoCorrente, setAnnoCorrente] = useState(oggi.getFullYear());
  const [cellaEspansa, setCellaEspansa] = useState(null);

  const giorni = generaGiorniDelMese(meseCorrente, annoCorrente);

  const getSeduteDelGiorno = (giorno) => {
    const chiave = giorno.toISOString().split("T")[0];
    return sedute.filter(s => s.data === chiave);
  };

  const cambiaMese = (delta) => {
    let nuovoMese = meseCorrente + delta;
    let nuovoAnno = annoCorrente;

    if (nuovoMese < 0) {
      nuovoMese = 11;
      nuovoAnno--;
    } else if (nuovoMese > 11) {
      nuovoMese = 0;
      nuovoAnno++;
    }

    setMeseCorrente(nuovoMese);
    setAnnoCorrente(nuovoAnno);
  };

  const nomeMese = new Date(annoCorrente, meseCorrente).toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric"
  });

  const stileAzione = {
    fontSize: "0.85rem",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "0.2rem 0.4rem"
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <button onClick={() => cambiaMese(-1)} style={stili[tema].bottone}>⬅️</button>
        <h2 style={stili[tema].titolo}>{nomeMese.charAt(0).toUpperCase() + nomeMese.slice(1)}</h2>
        <button onClick={() => cambiaMese(1)} style={stili[tema].bottone}>➡️</button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "0.5rem",
        fontWeight: "bold",
        color: stili[tema].sfondo.color,
        marginBottom: "0.5rem"
      }}>
        {["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"].map((g, i) => (
          <div key={i} style={{ textAlign: "center" }}>{g}</div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "0.75rem"
      }}>
        {giorni.map((giorno, index) => {
          if (!giorno) {
            return <div key={`vuoto-${index}`} style={{ visibility: "hidden" }}>–</div>;
          }

          const chiave = giorno.toISOString().split("T")[0];
          const èOggi = chiave === oggi.toISOString().split("T")[0];
          const èSabato = giorno.getDay() === 6;
          const seduteDelGiorno = getSeduteDelGiorno(giorno);
          const haSeduteNonCoperte = seduteDelGiorno.some(s => !s.coperta);

          return (
            <div
              key={chiave}
              className="cella"
              onClick={() => setCellaEspansa(cellaEspansa === chiave ? null : chiave)}
              style={{
                ...stili[tema].cella,
                ...(èOggi ? stili[tema].oggi : {}),
                ...(èSabato ? stili[tema].weekend : {}),
                ...(seduteDelGiorno.length ? stili[tema].attivo : {}),
                ...(haSeduteNonCoperte ? { backgroundColor: "#fdecea" } : {})
              }}
            >
              <strong>{giorno.getDate()}</strong>
{/* Riepilogo sedute */}
<div style={{ fontSize: "0.8rem", marginTop: "0.3rem", marginBottom: "0.5rem", color: "#444" }}>
  🔴 Scoperte: {seduteDelGiorno.filter(s => !s.coperta).length} &nbsp;|&nbsp;
  ⚠️ NO ANESTESIA: {seduteDelGiorno.filter(s => s.noAnestesia).length}
</div>



              {cellaEspansa === chiave && (
                <>
                  
                  {/* Fascia Mattina */}
                  <div className="fascia">
                    <div className="titolo-fascia">Mattina</div>
                    {seduteDelGiorno.filter(s => s.fascia === "mattina").length === 0 ? (
                      <div style={{ color: "#aaa", fontSize: "0.8rem" }}>—</div>
                    ) : (
                      seduteDelGiorno
                        .filter(s => s.fascia === "mattina")
                        .map(s => (
                          <div key={s.id} style={{
                            backgroundColor: "#5A9BD5",
                            color: "#fff",
                            padding: "0.3rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            textAlign: "center",
                            marginBottom: "0.3rem"
                          }}>
                            {s.specialistica || "Seduta"}<br />
                            <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem", marginTop: "0.3rem" }}>
                              <button onClick={(e) => { e.stopPropagation(); onModifica(s); }} title="Modifica" style={stileAzione}>✏️</button>
                              <button onClick={(e) => { e.stopPropagation(); onElimina(s.id); }} title="Elimina" style={stileAzione}>🗑️</button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>

                  {/* Fascia Pomeriggio */}
                  <div className="fascia">
                    <div className="titolo-fascia">Pomeriggio</div>
                    {seduteDelGiorno.filter(s => s.fascia === "pomeriggio").length === 0 ? (
                      <div style={{ color: "#aaa", fontSize: "0.8rem" }}>—</div>
                    ) : (
                      seduteDelGiorno
                        .filter(s => s.fascia === "pomeriggio")
                        .map(s => (
                          <div key={s.id} style={{
                            backgroundColor: "#5A9BD5",
                            color: "#fff",
                            padding: "0.3rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            textAlign: "center",
                            marginBottom: "0.3rem"
                          }}>
                            {s.specialistica || "Seduta"}<br />
                            <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem", marginTop: "0.3rem" }}>
                              <button onClick={(e) => { e.stopPropagation(); onModifica(s); }} title="Modifica" style={stileAzione}>✏️</button>
                              <button onClick={(e) => { e.stopPropagation(); onElimina(s.id); }} title="Elimina" style={stileAzione}>🗑️</button>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  {/* Bottone Aggiungi */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
                    <button
  onClick={(e) => {
    e.stopPropagation();
    onAggiungi(chiave);
    const [anno, mese, giorno] = chiave.split("-");
    const giornoLocale = new Date(+anno, +mese - 1, +giorno);
    giornoLocale.setHours(12, 0, 0, 0);
    setGiornoDaEsportare(giornoLocale);
  }}
>
  ➕
</button>

                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
