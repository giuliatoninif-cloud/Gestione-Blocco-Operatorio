import React, { useState } from "react";

export default function FiltroGrigliaMensile({ onFiltro }) {
  const [specialistica, setSpecialistica] = useState("");
  const [sala, setSala] = useState("");

  const applicaFiltro = () => {
    onFiltro({ specialistica, sala });
  };

  const resetFiltro = () => {
    setSpecialistica("");
    setSala("");
    onFiltro({});
  };

  return (
    <div style={stili.contenitore}>
      <label>
        Specialistica:
        <input
          type="text"
          value={specialistica}
          onChange={(e) => setSpecialistica(e.target.value)}
          placeholder="Es. CH GEN"
        />
      </label>

      <label>
        Sala:
        <input
          type="text"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
          placeholder="Esempio 5"
        />
      </label>

      <button onClick={applicaFiltro}>Filtra</button>
      <button onClick={resetFiltro} style={{ color: "red" }}>❌ Reimposta</button>
    </div>
  );
}

const stili = {
  contenitore: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    alignItems: "center"
  }
};
