import React, { useState } from "react";
import stili from "../stili";
import { useTema } from "./TemaProvider";

export default function InviaMessaggio({ onInvia }) {
  const { tema } = useTema();
  const [mittente, setMittente] = useState("");
  const [testo, setTesto] = useState("");

  const handleInvia = () => {
    if (!mittente.trim() || !testo.trim()) return;
    const nuovoMessaggio = {
      mittente,
      testo,
      data: new Date().toISOString()
    };
    onInvia(nuovoMessaggio);
    setTesto("");
  };

  return (
    <div style={{ ...stili[tema].sfondo, padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
      <h3 style={stili[tema].titolo}>✏️ Scrivi un messaggio</h3>
      <input
        type="text"
        placeholder="Mittente"
        value={mittente}
        onChange={e => setMittente(e.target.value)}
        style={{ ...stili[tema].input, marginBottom: "0.5rem" }}
      />
      <textarea
        placeholder="Testo del messaggio"
        value={testo}
        onChange={e => setTesto(e.target.value)}
        rows={4}
        style={{ ...stili[tema].input, resize: "vertical" }}
      />
      <button onClick={handleInvia} style={stili[tema].bottone}>
        ➤ Invia
      </button>
    </div>
  );
}

