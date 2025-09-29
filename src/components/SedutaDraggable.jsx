import { useDrag } from "react-dnd";

// 🎨 Generatore di colore coerente per ogni specialistica
const generaColore = (nome) => {
  const palette = [
    "#3498db", "#e74c3c", "#9b59b6", "#16a085", "#f39c12",
    "#2ecc71", "#34495e", "#d35400", "#1abc9c", "#7f8c8d"
  ];
  let hash = 0;
  for (let i = 0; i < nome.length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
};

const SedutaDraggable = ({ seduta, onModifica, onElimina }) => {
  const [, drag] = useDrag({
    type: "SEDUTA",
    item: { ...seduta }
  });

  return (
    <div ref={drag} style={{
      background: "#eaf2ff",
      padding: "0.3rem",
      borderRadius: "4px",
      marginBottom: "0.3rem",
      fontSize: "0.85rem",
      cursor: "grab",
      position: "relative"
    }}>
      {/* 🎨 Etichetta specialistica */}
      {seduta.specialistica && (
        <div style={{
          background: generaColore(seduta.specialistica),
          color: "#fff",
          fontSize: "0.75rem",
          padding: "0.2rem 0.4rem",
          borderRadius: "4px",
          marginBottom: "0.3rem",
          display: "inline-block"
        }}>
          {seduta.specialistica}
        </div>
      )}

      {/* 🏥 Descrizione e infermieri */}
      🏥 {seduta.descrizione}<br />
      👩‍⚕️ {seduta.infermieri.join(", ")}<br />

      {/* 🔴 Badge Non coperta */}
      {seduta.infermieri.length < 2 && (
        <div style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          background: "#e74c3c",
          color: "#fff",
          fontSize: "0.7rem",
          padding: "0.2rem 0.4rem",
          borderRadius: "4px"
        }}>
          🔴 Non coperta
        </div>
      )}

      {/* ✏️ Modifica e 🗑️ Elimina */}
      <button onClick={() => onModifica(seduta)} style={{
        marginTop: "0.3rem",
        fontSize: "0.75rem",
        background: "#f39c12",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "0.2rem 0.4rem",
        marginRight: "0.3rem",
        cursor: "pointer"
      }}>✏️</button>
      <button onClick={() => onElimina(seduta.id)} style={{
        fontSize: "0.75rem",
        background: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "0.2rem 0.4rem",
        cursor: "pointer"
      }}>🗑️</button>
    </div>
  );
};

export default SedutaDraggable;
