import React, { useState } from "react";
import * as XLSX from "xlsx";

const DisponibilitàDaExcel = ({ giorno, setMattina, setPomeriggio }) => {
  const [debugMsg, setDebugMsg] = useState("");

  const codiciTurno = {
    M: "Mattina",
    P: "Pomeriggio",
    PDF: "Mattina",
    F: null,
    DC: null,
    RB: null,
    RB: null,
    RR: null,
    SN: null,
    NC: null,
    D: null
    // aggiungi altri codici se servono
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const giornoNumero = giorno.getDate().toString(); // es. "24"
      const intestazioni = json[0];
      const colIndex = intestazioni.findIndex(h => h.toString().includes(giornoNumero));

      if (colIndex === -1) {
        setDebugMsg(`⚠️ Colonna per il giorno ${giornoNumero} non trovata`);
        setMattina([]);
        setPomeriggio([]);
        return;
      }

      const mattina = [];
      const pomeriggio = [];
      const codiciIgnorati = [];

      for (let i = 1; i < json.length; i++) {
        const riga = json[i];
        const nome = riga[0];
        const codice = riga[colIndex];

        const turno = codiciTurno[codice];
        if (turno === "Mattina") mattina.push({ nome });
        else if (turno === "Pomeriggio") pomeriggio.push({ nome });
        else if (codice && !codiciIgnorati.includes(codice)) codiciIgnorati.push(codice);
      }

      setMattina(mattina);
      setPomeriggio(pomeriggio);

      const msg = `✅ Colonna trovata: "${intestazioni[colIndex]}"\n` +
                  `✅ Mattina: ${mattina.length} — Pomeriggio: ${pomeriggio.length}\n` +
                  (codiciIgnorati.length > 0 ? `⚠️ Codici ignorati: ${codiciIgnorati.join(", ")}` : "");
      setDebugMsg(msg);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={stili.box}>
      <label style={stili.label}>📁 Carica foglio turni Excel:</label>
      <input type="file" accept=".xlsx" onChange={handleFile} />

      <div style={stili.risultati}>
        <h4>✅ Disponibili Mattina:</h4>
        <ul>{debugMsg.includes("Mattina") && debugMsg.split("\n")[1].includes("Mattina") ? null : <li>—</li>}</ul>

        <h4>✅ Disponibili Pomeriggio:</h4>
        <ul>{debugMsg.includes("Pomeriggio") && debugMsg.split("\n")[1].includes("Pomeriggio") ? null : <li>—</li>}</ul>

        {debugMsg && <pre style={stili.debug}>{debugMsg}</pre>}
      </div>
    </div>
  );
};

const stili = {
  box: {
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    display: "block"
  },
  risultati: {
    marginTop: "0.5rem"
  },
  debug: {
    backgroundColor: "#fff",
    border: "1px dashed #aaa",
    padding: "0.5rem",
    marginTop: "0.5rem",
    whiteSpace: "pre-wrap",
    fontSize: "0.9rem",
    color: "#444"
  }
};

export default DisponibilitàDaExcel;
