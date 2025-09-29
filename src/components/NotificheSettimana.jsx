import React from "react";
import { useTema } from "./TemaProvider";
import stili from "../stili";

export default function NotificheSettimana({ saleScoperte }) {
  const { tema } = useTema();

  const testo =
    saleScoperte === 0
      ? "✅ Tutte le sedute sono coperte questa settimana"
      : `⚠️ ${saleScoperte} sedute non coperte questa settimana`;

  return (
    <div
      style={{
        ...stili[tema].sfondo,
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={stili[tema].titolo}>🔔 Notifiche</h3>
      <p style={stili[tema].paragrafo}>{testo}</p>
    </div>
  );
}

