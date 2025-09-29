import React from "react";
import * as XLSX from "xlsx";

export default function ImportaTurni({ setTurni }) {
  const interpretaCodice = (codice) => {
    const mattina = ["M", "m", "PD", "pd"];
    const pomeriggio = ["P", "p"];
    const assenti = ["RB", "PDG", "PDN", "PDF", "R", "A", "122", "F", "104", "CM", "CP"];

    if (mattina.includes(codice)) return "Mattina";
    if (pomeriggio.includes(codice)) return "Pomeriggio";
    if (assenti.includes(codice)) return "Assente";
    return "Altro";
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const intestazioni = raw[0].slice(1); // giorni
      const turni = [];

      for (let i = 1; i < raw.length; i++) {
        const riga = raw[i];
        const nome = riga[0];

        for (let j = 1; j < riga.length; j++) {
          const codice = riga[j];
          const giorno = intestazioni[j - 1];

          if (nome && giorno && codice) {
            turni.push({
              operatore: nome,
              giorno,
              codice,
              turno: interpretaCodice(codice)
            });
          }
        }
      }

      setTurni(turni);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <label>📥 Importa turni da Excel:</label>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
  );
}
