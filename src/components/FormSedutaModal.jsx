import React, { useState, useEffect } from "react";
import { useTema } from "../components/TemaProvider";
import stili from "../stili";

export default function FormSedutaModal({ giornoSelezionato, infermieri, competenze, sedute, onSave, onClose }) {
  const { tema } = useTema();
const giornoCorretto = new Date(giornoSelezionato);
giornoCorretto.setHours(12, 0, 0, 0);
const [nuovoInfermiere, setNuovoInfermiere] = useState("");
const [noAnestesia, setNoAnestesia] = useState(false);
const giorno = giornoCorretto.getDate().toString().padStart(2, "0");
const mese = (giornoCorretto.getMonth() + 1).toString().padStart(2, "0");
const anno = giornoCorretto.getFullYear();
const dataItaliana = `${giorno}/${mese}/${anno}`;
console.log("📅 Data italiana:", dataItaliana);
const salva = () => {
  if (!specialistica) {
    alert("Seleziona una specialistica.");
    return;
  }

  const coperta = infermieriSelezionati.length >= 2;

  if (!coperta) {
    alert("⚠️ Seduta non coperta: meno di 2 infermieri.");
  }

  const giornoCorretto = new Date(giornoSelezionato);
  giornoCorretto.setHours(12, 0, 0, 0);
  const dataISO = giornoCorretto.toISOString().split("T")[0];


  const conflittiDettagliati = sedute
    .filter(s => s.data === dataISO && s.fascia === fascia)
    .flatMap(s => s.infermieri.map(nome => ({ nome, sala: s.sala || "?" })))
    .filter(({ nome }) => infermieriSelezionati.includes(nome));

  if (conflittiDettagliati.length > 0) {
    const messaggio = conflittiDettagliati
      .map(c => `${c.nome} (Sala ${c.sala})`)
      .join(", ");
    alert(`❌ Conflitto: ${messaggio} già assegnato nella stessa fascia`);
    return;
  }

  const nuovaSeduta = {
    id: Date.now(),
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

  console.log("✅ Seduta creata:", nuovaSeduta);
  onSave(nuovaSeduta);
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


  const [fascia, setFascia] = useState("mattina");
  const [sala, setSala] = useState("");
  const [specialistica, setSpecialistica] = useState("");
  const [tipo, setTipo] = useState("elettiva");
  const [nota, setNota] = useState("");
  const [infermieriCompatibili, setInfermieriCompatibili] = useState([]);
  const [infermieriSelezionati, setInfermieriSelezionati] = useState([]);
  useEffect(() => {
  if (specialistica) {
    const compatibili = infermieri
      .filter(i => i.competenze?.includes(specialistica))
      .map(i => i.nome);
    setInfermieriCompatibili(compatibili);
  }
}, [specialistica, infermieri]);

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
      <h2 style={stili[tema].titolo}>Nuova Seduta – {dataItaliana}</h2>


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
<label style={{ display: "block", marginTop: "1rem" }}>
  <input
    type="checkbox"
    checked={noAnestesia}
    onChange={(e) => setNoAnestesia(e.target.checked)}
  />
  &nbsp;NO ANESTESIA
</label>

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
        <button
  onClick={() => {
    if (!nuovoInfermiere.trim()) return;
    aggiungiManuale();
  }}
  style={stili[tema].bottone}
>
  Aggiungi
</button>

      </div>

      <label>📌 Tipo</label>
      <select value={tipo} onChange={e => setTipo(e.target.value)} style={inputStyle}>
        <option value="elettiva">Elettiva</option>
        <option value="urgente">Urgente</option>
      </select>

      <label>📝 Nota</label>
      <textarea value={nota} onChange={e => setNota(e.target.value)} rows={3} placeholder="Note aggiuntive..." style={{ ...inputStyle, resize: "vertical" }} />

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
