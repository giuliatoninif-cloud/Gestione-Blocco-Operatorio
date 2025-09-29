import React, { useState } from "react";
import { useTema } from "./TemaProvider";
import SedutaForm from "./SedutaForm";

export default function GrigliaMensileVisuale({ sedute, onModifica, onAggiungi, onElimina, soloConNote }) {
  const { tema } = useTema();
  const [modalAttivo, setModalAttivo] = useState(false);
  const [sedutaTemp, setSedutaTemp] = useState({});

  const giorniDelMese = Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => {
    const d = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1);
    return d.toISOString().split("T")[0];
  });

  const formattaData = (dataStr) => {
    const d = new Date(dataStr);
    return d.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };

  const handleSalvaSeduta = (dati) => {
    const nuova = {
      id: Date.now(),
      ...sedutaTemp,
      ...dati
    };
    onAggiungi(nuova.data, nuova.fascia, nuova.tipo, nuova);
    setModalAttivo(false);
  };

  return (
    <div style={stili[tema].griglia}>
      <div style={stili[tema].legenda}>
        <span style={stili[tema].badge("elettiva")}>Elettiva</span>
        <span style={stili[tema].badge("urgenza")}>Urgenza</span>
        {soloConNote && <span style={{ fontStyle: "italic", marginLeft: "1rem" }}>🔍 Solo sedute con note</span>}
      </div>

      {giorniDelMese.map(data => {
        const seduteDelGiorno = sedute.filter(s => s.data === data);

        return (
          <div key={data} style={stili[tema].giorno}>
            <h3 style={stili[tema].titolo}>{formattaData(data)}</h3>

            {["mattina", "pomeriggio"].map(fascia => (
              <div key={fascia} style={stili[tema].fascia}>
                <h4 style={stili[tema].fasciaTitolo}>
                  {fascia === "mattina" ? "🕗 Mattina" : "🕒 Pomeriggio"}
                </h4>

                {["elettiva", "urgenza"].map(tipo => {
                  let seduteFiltrate = seduteDelGiorno.filter(s => s.fascia === fascia && s.tipo === tipo);
                  if (soloConNote) {
                    seduteFiltrate = seduteFiltrate.filter(s => s.note && s.note.trim() !== "");
                  }

                  return (
                    <div key={tipo} style={stili[tema].riga}>
                      <strong style={stili[tema].etichetta(tipo)}>
                        {tipo === "elettiva" ? "Elettive" : "Urgenze"}{" "}
                        <span style={stili[tema].conteggio(tipo)}>
                          {seduteFiltrate.length}
                        </span>
                      </strong>

                      {seduteFiltrate.map((s) => (
                        <div key={s.id} style={stili[tema].gruppoSeduta}>
                          <button
                            onClick={() => onModifica(s)}
                            style={stili[tema].seduta(tipo)}
                            title={`Sala ${s.sala}${s.note ? ` – ${s.note}` : ""}`}
                          >
                            ✏️ {s.specialistica}
                          </button>
                          <button
                            onClick={() => {
                              const conferma = window.confirm(`Vuoi davvero eliminare la seduta di ${s.specialistica} in sala ${s.sala}?`);
                              if (conferma) onElimina(s);
                            }}
                            style={stili[tema].elimina}
                            title="Elimina seduta"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          setSedutaTemp({ data, fascia, tipo });
                          setModalAttivo(true);
                        }}
                        style={stili[tema].aggiungi}
                        title={`Aggiungi seduta ${tipo}`}
                      >
                        ➕
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}

      {modalAttivo && (
        <div style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "90%",
          maxWidth: "600px"
        }}>
          <SedutaForm
            iniziali={sedutaTemp}
            onSalva={handleSalvaSeduta}
          />
          <button onClick={() => setModalAttivo(false)} style={{ marginTop: "1rem" }}>❌ Chiudi</button>
        </div>
      )}
    </div>
  );
}

const stili = {
  chiaro: {
    griglia: { display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" },
    legenda: { display: "flex", gap: "1rem", marginBottom: "1rem" },
    giorno: { border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", backgroundColor: "#fefefe" },
    titolo: { marginBottom: "0.5rem", color: "#2c3e50", fontSize: "1.1rem", fontWeight: "bold", textTransform: "capitalize" },
    fascia: { marginBottom: "1rem" },
    fasciaTitolo: { marginBottom: "0.3rem", fontSize: "1rem", color: "#555" },
    riga: { display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginBottom: "0.5rem" },
    gruppoSeduta: { display: "flex", alignItems: "center", gap: "0.3rem" },
    etichetta: tipo => ({ fontSize: "0.95rem", color: tipo === "urgenza" ? "#c0392b" : "#2980b9" }),
    conteggio: tipo => ({ backgroundColor: tipo === "urgenza" ? "#e74c3c" : "#3498db", color: "#fff", borderRadius: "6px", padding: "2px 6px", fontSize: "0.75rem", fontWeight: "500", marginLeft: "6px" }),
    badge: tipo => ({ backgroundColor: tipo === "urgenza" ? "#e74c3c" : "#3498db", color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "0.75rem", fontWeight: "500" }),
    seduta: tipo => ({ backgroundColor: tipo === "urgenza" ? "#c0392b" : "#2980b9", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "500" }),
    elimina: { backgroundColor: "#e0e0e0", color: "#333", border: "none", padding: "0.2rem 0.4rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" },
    aggiungi: { backgroundColor: "#7f8c8d", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }
  },
  scuro: {
    // identico al chiaro ma con colori scuri, se vuoi lo duplico
  }
};
