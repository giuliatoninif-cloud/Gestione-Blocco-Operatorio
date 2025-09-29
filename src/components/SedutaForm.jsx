import React, { useState } from "react";
import { specialisticheDisponibili } from "../data/competenze"; // correggi il percorso se serve


function SedutaForm({ iniziali = {}, onSalva }) {
  const [specialistica, setSpecialistica] = useState(iniziali.specialistica || "");
  const [sala, setSala] = useState(iniziali.sala || "");
  const [infermieri, setInfermieri] = useState(iniziali.infermieri || []);
  const [manuale, setManuale] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuovaSeduta = {
      specialistica,
      sala,
      infermieri
    };
    onSalva({
  ...iniziali,
  specialistica,
  sala,
  note,
  id: iniziali.id || Date.now()
});

  };

  const handleAggiungiManuale = () => {
    if (manuale.trim()) {
      setInfermieri((prev) => [...prev, manuale.trim()]);
      setManuale("");
    }
  };

  const handleRimuoviInfermiere = (nome) => {
    setInfermieri((prev) => prev.filter((i) => i !== nome));
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h2>➕ Aggiungi Seduta</h2>

      <label>
        Specialistica:
  <select
    value={specialistica}
    onChange={(e) => setSpecialistica(e.target.value)}
    style={{ width: "100%", marginBottom: "1rem" }}
  >
    <option value="">– Seleziona –</option>
    {specialisticheDisponibili.map((spec, i) => (
      <option key={i} value={spec}>{spec}</option>
    ))}
  </select>
      </label>

      <label>
        Sala:
        <input
          type="text"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </label>

      <label>
        Aggiungi infermiere manualmente:
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="text"
            value={manuale}
            onChange={(e) => setManuale(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={handleAggiungiManuale}>+ Aggiungi</button>
        </div>
      </label>

      {infermieri.length < 2 && (
        <p style={{ color: "#c0392b", fontStyle: "italic" }}>
          ⚠️ Copertura insufficiente (minimo 2 infermieri)
        </p>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <strong>Infermieri assegnati:</strong>
        <ul style={{ paddingLeft: "1rem" }}>
          {infermieri.map((nome, i) => (
            <li key={i} style={{ marginBottom: "0.3rem" }}>
              {nome}{" "}
              <button type="button" onClick={() => handleRimuoviInfermiere(nome)} style={{ marginLeft: "0.5rem" }}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button type="submit">💾 Salva seduta</button>
        <button type="button" onClick={() => console.log("Chiudi")}>❌ Chiudi</button>
      </div>
    </form>
  );
}

export default SedutaForm;
