import React from "react";
import { useTema } from "./TemaProvider"; // correggi se il file è altrove
import stili from "../stili"; // o "../data/stili"

export default function RiepilogoMessaggi({ messaggi }) {
  const { tema } = useTema();
  const lista = Array.isArray(messaggi) ? messaggi : [];

  return (
    <div style={{ ...stili[tema].sfondo, padding: "2rem", minHeight: "100vh" }}>
      <h2 style={stili[tema].titolo}>📨 I tuoi messaggi</h2>

      {lista.length === 0 ? (
        <p style={stili[tema].paragrafo}>Nessun messaggio ricevuto.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {lista.map((msg, i) => {
            const mittente = msg.mittente || "Mittente sconosciuto";
            const testo = msg.testo || "–";
            const data = msg.data
              ? new Date(msg.data).toLocaleDateString("it-IT", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })
              : "Data non disponibile";

            return (
              <li
                key={msg.id || i}
                style={{
                  backgroundColor: tema === "chiaro" ? "#f0f8ff" : "#2a2a2a",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
              >
                <div style={{ marginBottom: "0.5rem", fontWeight: "bold", color: stili[tema].paragrafo.color }}>
                  {mittente}
                </div>
                <p style={{ marginBottom: "0.5rem", color: stili[tema].paragrafo.color }}>{testo}</p>
                <small style={{ fontSize: "0.8rem", color: "#888" }}>{data}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
