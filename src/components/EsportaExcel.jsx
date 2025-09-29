import React from "react";
import * as XLSX from "xlsx";

const EsportaExcel = ({ sedute, giorno }) => {
  const dataISO = giorno.toISOString().split("T")[0];

  const parseData = (data) => {
    if (typeof data === "string" && data.includes("/")) {
      const [gg, mm, aa] = data.split("/");
      return new Date(`${aa}-${mm}-${gg}`);
    }
    return new Date(data);
  };

  const èStessoGiorno = (d1, d2) => {
    return d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);
  };

  const seduteDelGiorno = sedute.filter(s => èStessoGiorno(parseData(s.data), giorno));

  const esporta = () => {
    if (seduteDelGiorno.length === 0) {
      alert("❌ Nessuna seduta da esportare per questa data.");
      return;
    }

    const dati = seduteDelGiorno.map(s => ({
      Data: s.data,
      Fascia: s.fascia,
      Specialistica: s.specialistica,
      Sala: s.sala || "–",
      Infermieri: (s.infermieri || []).join(", "),
      Nota: s.nota || "–"
    }));

    const foglio = XLSX.utils.json_to_sheet(dati);
    const cartella = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(cartella, foglio, "Sedute");

    XLSX.writeFile(cartella, `Sedute_${dataISO}.xlsx`);
  };

  return (
    <button onClick={esporta} style={stili.bottoneVerde}>📊 Esporta Excel</button>
  );
};

const stili = {
  bottoneVerde: {
    backgroundColor: "#367038ff",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem"
  }
};

export default EsportaExcel;
