import React, { useState, useEffect } from "react";
import { useTema } from "../components/TemaProvider";
import stili from "../stili";

export default function ModificaSedutaModal({ seduta, infermieri, competenze, sedute, onSave, onClose }) {
  const { tema } = useTema();

  const [fascia, setFascia] = useState(seduta?.fascia || "mattina");
  const [sala, setSala] = useState(seduta?.sala || "");
  const [specialistica, setSpecialistica] = useState(seduta?.specialistica || "");
  const [tipo, setTipo] = useState(seduta?.tipo || "elettiva");
  const [nota, setNota] = useState(seduta?.nota || "");
  const [noAnestesia, setNoAnestesia] = useState(seduta?.noAnestesia || false);
  const [infermieriCompatibili, setInfermieriCompatibili] = useState([]);
  const [infermieriSelezionati, setInfermieriSelezionati] = useState(seduta?.infermieri || []);
  const [nuovoInfermiere, setNuovoInfermiere] = useState("");

  const dataFormattata = new Date(seduta?.data);
  const giorno = dataFormattata.getDate().toString().padStart(2, "0");
  const mese = (dataFormattata.getMonth() + 1).toString().padStart(2, "0");
  const anno = dataFormattata.getFullYear();
  const dataItaliana = `${giorno}/${mese}/${anno}`;

  useEffect(() => {
    if (specialistica) {
      const compatibili = infermieri
        .filter(i => i.competenze?.includes(specialistica))
        .map(i => i.nome);
      setInfermieriCompatibili(compatibili);
    }
  }, [specialistica, infermieri]);

  const salva = () => {
    if (!specialistica) {
      alert("Seleziona una specialistica.");
      return;
    }

    if (!Array.isArray(sedute)) {
      console.warn("⚠️ sedute non è un array valido");
      return;
    }

    const coperta = infermieriSelezionati.length >= 2;

    if (!coperta) {
      alert("⚠️ Seduta non coperta: meno di 2 infermieri.");
    }

    const giornoCorretto = new Date(seduta.data);
    giornoCorretto.setHours(12, 0, 0, 0);
    const dataISO = giornoCorretto.toISOString().split("T")[0];

    const conflitti = sedute
  .filter(s => s.data === dataISO && s.fascia === fascia && s.id !== seduta.id)
  .flatMap(s => s.infermieri)
  .filter(nome => infermieriSelezionati.includes(nome));

    if (conflitti.length > 0) {
      alert(`❌ Conflitto: ${conflitti.join(", ")} già assegnato nella stessa fascia`);
      return;
    }

    const sedutaModificata = {
      ...seduta,
      data: dataISO,
      fascia,
      sala,
      specialistica,
      tipo,
      nota,
      infermieri: infermieriSelezionati,
      coperta,
      noAnestesia
    };

    onSave(sedutaModificata);
    onClose();
  };

  const aggiungiManuale = () => {
    const nome = nuovoInfermiere.trim();
    if (nome && !infermieriSelezionati.includes(nome)) {
      setInfermieriSelezionati(prev => [...prev, nome]);
      setNuovoInfermiere("");
    }
  };

  const rimuoviInfermiere = (nome) => {
    setInfermieriSelezionati(prev => prev.filter(n => n !== nome));
  };
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: stili[tema].sfondo.backgroundColor,
      color: stili[tema].sfondo.color,
      padding: "0.5rem",
      borderRadius: "8px",
      boxShadow: "0 0px 20px rgba(0,0,0,0.2)",
      zIndex: 1000,
      width: "95%",
      maxWidth: "800px",
      maxHeight: "80vh",
      overflowY: "auto",
      margin: "0 auto"
    }}>
      <h2 style={stili[tema].titolo}>Modifica Seduta – {dataItaliana}</h2>

      {sala && (
        <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#555" }}>
          🏥 Sala selezionata: <strong>{sala}</strong>
        </div>
      )}

      <label>🕒 Fascia oraria</label>
      <select value={fascia} onChange={e => setFascia(e.target.value)} style={inputStyle}>
        <option value="mattina">Mattina</option>
        <option value="pomeriggio">Pomeriggio</option>
      </select>

      <label>🏥 Sala (opzionale)</label>
      <input type="text" value={sala} onChange={e => setSala(e.target.value)} placeholder="Es. Sala 3" style={inputStyle} />

      <label>🧑‍⚕️ Specialistica *</label>
      <select value={specialistica} onChange={e => setSpecialistica(e.target.value)} style={inputStyle}>
        <option value="">– Seleziona –</option>
        {(competenze || []).map((spec, i) => (
          <option key={i} value={spec}>{spec}</option>
        ))}
      </select>

      <label style={{ display: "block", marginTop: "1rem" }}>
        <input
          type="checkbox"
          checked={noAnestesia}
          onChange={(e) => setNoAnestesia(e.target.checked)}
        />
        &nbsp;NO ANESTESIA
      </label>

      <label>👩‍⚕️ Infermieri compatibili</label>
      <select
        multiple
        value={infermieriSelezionati}
        onChange={e => {
          const selezionati = Array.from(e.target.selectedOptions).map(opt => opt.value);
          setInfermieriSelezionati(selezionati);
        }}
        style={{ ...inputStyle, height: "6rem" }}
      >
        {infermieriCompatibili.map((nome, i) => (
          <option key={i} value={nome}>{nome}</option>
        ))}
      </select>
      <small style={{ color: "#555", fontSize: "0.85rem" }}>
        Tieni premuto Ctrl (Windows) o Cmd (Mac) per selezioni multiple
      </small>

      {infermieriSelezionati.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>👩‍⚕️ Infermieri selezionati:</strong>
          <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
            {infermieriSelezionati.map((nome, i) => (
              <li key={i} style={{ marginBottom: "0.3rem" }}>
                {nome}{" "}
                <button onClick={() => rimuoviInfermiere(nome)} style={{
                  background: "#c0392b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}>Rimuovi</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <label>➕ Aggiungi infermiere manualmente</label>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={nuovoInfermiere}
          onChange={e => setNuovoInfermiere(e.target.value)}
          placeholder="Nome infermiere"
          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
        />
        <button onClick={aggiungiManuale} style={stili[tema].bottone}>Aggiungi</button>
      </div>

      <label>📌 Tipo</label>
      <select value={tipo} onChange={e => setTipo(e.target.value)} style={inputStyle}>
        <option value="elettiva">Elettiva</option>
        <option value="urgente">Urgente</option>
      </select>

      <label style={{ display: "block", marginTop: "1rem" }}>📝 Nota</label>
      <textarea
        value={nota}
        onChange={e => setNota(e.target.value)}
        rows={3}
        placeholder="Note aggiuntive..."
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
        <button onClick={salva} style={stili[tema].bottone}>💾 Salva seduta</button>
        <button onClick={onClose} style={{ ...stili[tema].bottone, backgroundColor: "#7f8c8d" }}>❌ Chiudi</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.4rem",
  marginBottom: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "0.9rem"
};
