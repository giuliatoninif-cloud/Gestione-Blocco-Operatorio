import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";
import parseDataLocale from "../utils/parseDataLocale";

const EsportaPDF = ({ sedute, giorno, setGiorno }) => {
  const giornoISO = `${giorno.getFullYear()}-${String(giorno.getMonth() + 1).padStart(2, "0")}-${String(giorno.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    console.log("📦 Sedute aggiornate:", sedute);
    console.log("📅 Giorno ricevuto:", giorno.toISOString());
  }, [sedute, giorno]);

  const seduteDelGiorno = sedute.filter(s => {
    const dataSeduta = new Date(s.data);
    dataSeduta.setHours(12, 0, 0, 0);
    return (
      dataSeduta.getFullYear() === giorno.getFullYear() &&
      dataSeduta.getMonth() === giorno.getMonth() &&
      dataSeduta.getDate() === giorno.getDate()
    );
  });

  const generaPDF = () => {
    setTimeout(() => {
      const element = document.getElementById("contenuto-pdf");
      if (!element) {
        alert("❌ Contenuto PDF non trovato.");
        return;
      }

      const opt = {
        margin: 0.5,
        filename: `Sedute_${giornoISO}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 }
      };

      html2pdf().set(opt).from(element).save();
    }, 300); // ⏱️ Delay aumentato per garantire aggiornamento DOM
  };

  // 🔹 Formattazione con giorno della settimana
  const giornoFormattato = giorno.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <div style={{ padding: "2rem" }}>
      {/* 🔹 Selettore data + bottone */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <label htmlFor="dataPDF">📅 Giorno da esportare:</label>
        <input
          id="dataPDF"
          type="date"
          value={giornoISO}
          onChange={e => {
            const giornoLocale = parseDataLocale(e.target.value);
            giornoLocale.setHours(12, 0, 0, 0);
            setGiorno(giornoLocale);
          }}
        />
        <button onClick={generaPDF} style={stili.bottoneBlu}>📄 Esporta PDF</button>
      </div>

      {/* Anteprima PDF */}
      <h3 style={{ marginBottom: "0.5rem", color: "#5A9BD5" }}>Anteprima PDF</h3>
      <div id="contenuto-pdf" key={giornoISO} style={stili.contenuto}>

        <div style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold", textTransform: "capitalize" }}>
          Programmazione – {giornoFormattato}
        </div>

        {seduteDelGiorno.length > 0 ? (
          <table style={stili.tabella}>
            <thead>
              <tr>
                <th style={stili.cell}>Specialistica</th>
                <th style={stili.cell}>Fascia</th>
                <th style={stili.cell}>Sala</th>
                <th style={stili.cell}>Infermieri</th>
                <th style={stili.cell}>Nota</th>
              </tr>
            </thead>
            <tbody>
              {seduteDelGiorno.map((s, i) => (
                <tr key={i}>
                  <td style={stili.cell}>{s.specialistica}</td>
                  <td style={stili.cell}>{s.fascia}</td>
                  <td style={stili.cell}>{s.sala || "–"}</td>
                  <td style={stili.cell}>{(s.infermieri || []).join(", ")}</td>
                  <td style={stili.cell}>{s.nota || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "#666", fontStyle: "italic" }}>
            Nessuna seduta è prevista per il giorno selezionato.<br />
            Il presente documento attesta l’assenza di attività programmate.
          </div>
        )}
      </div>
    </div>
  );
};

const stili = {
  bottoneBlu: {
    backgroundColor: "#5A9BD5",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem"
  },
  contenuto: {
    fontFamily: "Segoe UI, sans-serif",
    color: "#333",
    backgroundColor: "#fff",
    padding: "1rem",
    maxWidth: "700px",
    marginTop: "1rem",
    border: "none",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "6px"
  },
  tabella: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem"
  },
  cell: {
    border: "1px solid #ccc",
    padding: "0.5rem",
    fontSize: "0.85rem",
    textAlign: "left",
    verticalAlign: "top"
  }
};

export default EsportaPDF;
