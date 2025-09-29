import { useState, useEffect } from "react";
import { competenze } from "../data/competenze";


function GestioneInfermieri() {
  const [infermieri, setInfermieri] = useState(() => {
    const salvati = localStorage.getItem("infermieri");
    return salvati ? JSON.parse(salvati) : [];
  });

  const [nome, setNome] = useState("");
  const [selezionate, setSelezionate] = useState([]);
  const [modificaId, setModificaId] = useState(null);
  const [messaggio, setMessaggio] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    localStorage.setItem("infermieri", JSON.stringify(infermieri));
  }, [infermieri]);

  const resetForm = () => {
    setNome("");
    setSelezionate([]);
    setModificaId(null);
  };

  const handleToggle = (comp) => {
    setSelezionate(prev =>
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    );
  };

  const handleSalva = () => {
    if (!nome.trim()) return;
    const nuovo = {
      id: modificaId || Date.now(),
      nome: nome.trim(),
      competenze: selezionate
    };
    const aggiornati = modificaId
      ? infermieri.map(i => i.id === modificaId ? nuovo : i)
      : [...infermieri, nuovo];
    setInfermieri(aggiornati);
    resetForm();
    setMessaggio(modificaId ? "✅ Infermiere aggiornato!" : "➕ Infermiere aggiunto!");
    setTimeout(() => setMessaggio(""), 3000);
  };

  const handleModifica = (inf) => {
    setNome(inf.nome);
    setSelezionate(Array.isArray(inf.competenze) ? inf.competenze : []);
    setModificaId(inf.id);
    setMessaggio("✏️ Modalità modifica attiva");
    setTimeout(() => setMessaggio(""), 3000);
  };

  const handleElimina = (id) => {
    setInfermieri(infermieri.filter(i => i.id !== id));
    setMessaggio("❌ Infermiere eliminato.");
    setTimeout(() => setMessaggio(""), 3000);
    if (modificaId === id) resetForm();
  };

  const infermieriFiltrati = infermieri.filter(i => {
    const nomeMatch = i.nome.toLowerCase().includes(filtro.toLowerCase());
    const competenzeMatch = Array.isArray(i.competenze)
      ? i.competenze.some(c => c.toLowerCase().includes(filtro.toLowerCase()))
      : false;
    return nomeMatch || competenzeMatch;
  });

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "auto",
      fontFamily: "Times New Roman, serif",
      background: "#fefefe",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "1rem", color: "#000" }}>👩‍⚕️ Gestione Infermieri</h2>

      {messaggio && <div style={{
        marginBottom: "1rem",
        padding: "0.5rem",
        background: "#dff0d8",
        borderRadius: "6px",
        color: "#3c763d"
      }}>{messaggio}</div>}

      <div style={{
        marginBottom: "2rem",
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        background: "#f9f9f9"
      }}>
        <input
          type="text"
          placeholder="📝 Nome infermiere"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "1rem",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "0.5rem"
        }}>
          {competenze.map(comp => (
            <label key={comp} style={{ fontSize: "0.9rem" }}>
              <input
                type="checkbox"
                checked={selezionate.includes(comp)}
                onChange={() => handleToggle(comp)}
              />{" "}
              {comp}
            </label>
          ))}
        </div>

        <button onClick={handleSalva} style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          {modificaId ? "💾 Aggiorna" : "➕ Aggiungi"}
        </button>
      </div>

      <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>🔍 Cerca infermieri</h3>
      <input
        type="text"
        placeholder="🔎 Cerca per nome o competenza"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "1.5rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>👥 Infermieri registrati</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {infermieriFiltrati.map(inf => (
          <li key={inf.id} style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "0.5rem"
          }}>
            <strong>{inf.nome}</strong><br />
            <span style={{ fontSize: "0.85rem", color: "#555" }}>
              {(Array.isArray(inf.competenze) ? inf.competenze : []).join(", ") || "—"}
            </span><br />
            <button onClick={() => handleModifica(inf)} style={{
              marginRight: "0.5rem",
              padding: "0.3rem 0.6rem",
              background: "#f39c12",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>✏️ Modifica</button>
            <button onClick={() => handleElimina(inf.id)} style={{
              padding: "0.3rem 0.6rem",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>❌ Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestioneInfermieri;
