import React, { useState, useEffect } from "react";
import SedutaForm from "../components/SedutaForm"; // Assicurati che il percorso sia corretto

export default function GrigliaMensile() {
  const [sedute, setSedute] = useState(() => {
    const salvate = localStorage.getItem("seduteMensili");
    return salvate ? JSON.parse(salvate) : [];
  });

  const [modalAttivo, setModalAttivo] = useState(false);
  const [sedutaTemp, setSedutaTemp] = useState(null);

  useEffect(() => {
    localStorage.setItem("seduteMensili", JSON.stringify(sedute));
  }, [sedute]);

  const giorniDelMese = Array.from({ length: 31 }, (_, i) => {
    const d = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1);
    return d.toISOString().split("T")[0];
  });

  const aggiungiSeduta = (nuova) => {
    setSedute(prev => [...prev, { ...nuova, id: Date.now() }]);
    setModalAttivo(false);
  };

  const modificaSeduta = (modificata) => {
    setSedute(prev => prev.map(s => s.id === modificata.id ? modificata : s));
    setModalAttivo(false);
  };

  const eliminaSeduta = (id) => {
    if (window.confirm("Vuoi davvero eliminarla?")) {
      setSedute(prev => prev.filter(s => s.id !== id));
    }
  };

  const apriForm = (data, fascia, tipo, seduta = null) => {
    setSedutaTemp(seduta || { data, fascia, tipo });
    setModalAttivo(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📅 Griglia Mensile Sedute</h2>

      {giorniDelMese.map(data => (
        <div key={data} style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
          <h3>{new Date(data).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</h3>

          {["mattina", "pomeriggio"].map(fascia => (
            <div key={fascia} style={{ marginBottom: "1rem" }}>
              <h4>{fascia === "mattina" ? "🕗 Mattina" : "🕒 Pomeriggio"}</h4>

              {["elettiva", "urgenza"].map(tipo => {
                const seduteFiltrate = sedute.filter(s => s.data === data && s.fascia === fascia && s.tipo === tipo);

                return (
                  <div key={tipo} style={{ marginBottom: "0.5rem" }}>
                    <strong>{tipo === "elettiva" ? "Elettive" : "Urgenze"} ({seduteFiltrate.length})</strong>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                      {seduteFiltrate.map(s => (
                        <div key={s.id} style={{ background: "#eee", padding: "0.5rem", borderRadius: "6px" }}>
                          <div><strong>{s.specialistica}</strong> – Sala {s.sala}</div>
                          <button onClick={() => apriForm(data, fascia, tipo, s)}>✏️ Modifica</button>
                          <button onClick={() => eliminaSeduta(s.id)}>❌ Elimina</button>
                        </div>
                      ))}
                      <button onClick={() => apriForm(data, fascia, tipo)}>➕ Aggiungi</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      {modalAttivo && (
        <div style={{
          position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)",
          background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}>
          <SedutaForm
            iniziali={sedutaTemp}
            onSalva={sedutaTemp?.id ? modificaSeduta : aggiungiSeduta}
            onChiudi={() => setModalAttivo(false)}
          />
        </div>
      )}
    </div>
  );
}
