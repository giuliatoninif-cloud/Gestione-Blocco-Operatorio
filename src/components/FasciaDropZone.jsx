import { useDrop } from "react-dnd";
import { format } from "date-fns";
import SedutaDraggable from "./SedutaDraggable";

const FasciaDropZone = ({ giorno, fascia, sedute, onDrop, onModifica, onElimina, onAggiungi }) => {
  const [, drop] = useDrop({
    accept: "SEDUTA",
    drop: (item) => {
      const nuova = { ...item, data: format(giorno, "yyyy-MM-dd"), fascia };
      onDrop(nuova);
    }
  });

  const limite = fascia === "Mattina" ? 7 : 3;
  const limiteRaggiunto = sedute.length >= limite;

  return (
    <div ref={drop} style={{
      minHeight: "40px",
      background: "#f9f9f9",
      border: "1px dashed #ccc",
      borderRadius: "4px",
      padding: "0.3rem",
      marginTop: "0.3rem"
    }}>
      {/* 🎯 Contatore visivo */}
      <div key={`contatore-${fascia}`} style={{
        fontSize: "0.75rem",
        color: limiteRaggiunto ? "#e74c3c" : "#888",
        marginBottom: "0.3rem"
      }}>
        {sedute.length} / {limite} sedute
      </div>

      {/* 🏥 Sedute */}
      {sedute.map(s => (
        <SedutaDraggable
          key={`seduta-${s.id}`}
          seduta={s}
          onModifica={onModifica}
          onElimina={onElimina}
        />
      ))}

      {/* ➕ Bottone aggiunta */}
      <button
        onClick={() => onAggiungi(giorno, fascia)}
        disabled={limiteRaggiunto}
        style={{
          marginTop: "0.3rem",
          fontSize: "0.8rem",
          background: limiteRaggiunto ? "#ccc" : "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "0.2rem 0.5rem",
          cursor: limiteRaggiunto ? "not-allowed" : "pointer"
        }}
      >
        ➕ Aggiungi seduta
      </button>
    </div>
  );
};

export default FasciaDropZone;
