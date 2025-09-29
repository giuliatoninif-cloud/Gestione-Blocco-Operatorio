import React, { useState, useEffect } from "react";
import GrigliaMensileDeluxe from "../pages/GrigliaMensileDeluxe";
import EsportaPDF from "./EsportaPDF";

export default function PlanningSettimana() {
  // 🔒 Blindatura iniziale della data contro UTC
  const oggi = new Date();
  oggi.setHours(12, 0, 0, 0);
  const [giornoDaEsportare, setGiornoDaEsportare] = useState(oggi);

  const [sedute, setSedute] = useState([]);

  const aggiungiSeduta = (nuovaSeduta) => {
    setSedute(prev => [...prev, nuovaSeduta]);
  };

  useEffect(() => {
    // 🔹 Carica le sedute vere da API, file, ecc.
    fetch("/api/sedute.json")
      .then(res => res.json())
      .then(data => setSedute(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>📅 Programmazione Sale</h1>

      <div style={{
        marginBottom: "2rem",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#f9f9f9"
      }}>
        <h3 style={{ marginBottom: "0.5rem" }}>🖨️ Esporta PDF</h3>
        <EsportaPDF
          sedute={sedute}
          giorno={giornoDaEsportare}
          setGiorno={setGiornoDaEsportare}
        />
      </div>

      <GrigliaMensileDeluxe
        sedute={sedute}
        onAggiungi={(data) => {
          console.log("📌 Giorno cliccato:", data);
          const [anno, mese, giorno] = data.split("-");
          const giornoLocale = new Date(+anno, +mese - 1, +giorno);
          giornoLocale.setHours(12, 0, 0, 0);
          console.log("📌 Giorno blindato:", giornoLocale.toISOString());
          setGiornoDaEsportare(giornoLocale);
        }}
        onModifica={(seduta) => {
          const [anno, mese, giorno] = seduta.data.split("-");
          const giornoLocale = new Date(+anno, +mese - 1, +giorno);
          giornoLocale.setHours(12, 0, 0, 0);
          setGiornoDaEsportare(giornoLocale);
        }}
        onElimina={(id) => {
          setSedute(prev => prev.filter(s => s.id !== id));
        }}
      />
    </div>
  );
}
