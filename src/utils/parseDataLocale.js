// ✅ parseDataLocale(dataString)
// Costruisce una data locale blindata a mezzogiorno per evitare slittamenti

function parseDataLocale(dataString) {
  // Esempio: "2025-09-30" → ["2025", "09", "30"]
  const [anno, mese, giorno] = dataString.split("-");

  // Costruzione locale: mese - 1 perché in JS è zero-based
  const data = new Date(+anno, +mese - 1, +giorno);

  // Blindatura oraria: mezzogiorno → evita slittamenti UTC
  data.setHours(12, 0, 0, 0);

  return data;
}

export default parseDataLocale;
