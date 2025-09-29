import { useState } from "react";
import competenze from "../data/competenze";

function InfermieriDisponibili({ infermieri }) {
  const [specialistica, setSpecialistica] = useState("");

  const filtrati = infermieri.filter(i =>
    Array.isArray(i.competenze) && i.competenze.includes(specialistica)
  );

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "700px",
      margin: "auto",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>🔍 Infermieri per specialistica</h2>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Seleziona specialistica:
        <select
          value={specialistica}
          onChange={(e) => setSpecialistica(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "0.3rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">-- Seleziona --</option>
          {competenze.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      {specialistica && (
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>
            👩‍⚕️ Infermieri compatibili ({filtrati.length})
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filtrati.map(i => (
              <li key={i.id} style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                background: "#f9f9f9",
                borderRadius: "6px",
                border: "1px solid #eee"
              }}>
                <strong>{i.nome}</strong><br />
                <span style={{ fontSize: "0.85rem", color: "#555" }}>
                  {i.competenze.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InfermieriDisponibili;
