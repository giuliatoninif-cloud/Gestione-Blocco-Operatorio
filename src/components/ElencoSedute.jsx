function ElencoSedute({ sedute, onModifica, onElimina }) {
  if (!Array.isArray(sedute) || sedute.length === 0) {
    return <p style={{ fontStyle: "italic", color: "#888" }}>Nessuna seduta programmata.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {sedute.map((s) => (
        <li
          key={`${s.id}-${s.data}-${s.sala}`}
          style={{
            backgroundColor: "#f4f4f4",
            padding: "0.8rem",
            marginBottom: "0.5rem",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div>
            <strong>{s.specialistica}</strong> – Sala {s.sala} –{" "}
            {Array.isArray(s.infermieri) && s.infermieri.length > 0
              ? s.infermieri.map(i => i.nome || i).join(", ")
              : "Nessun infermiere assegnato"}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => onModifica(s)} title="Modifica seduta">✏️</button>
            <button onClick={() => onElimina(s)} title="Elimina seduta">🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ElencoSedute;
