import { format } from "date-fns";
import { it } from "date-fns/locale";

// sedute va passato come parametro
export function getSedutePerGiornoEFascia(giorno, fascia, sedute) {
  // Urgenze fisse da lunedì a sabato
  if (fascia === "Urgenza-Mattina" || fascia === "Urgenza-Pomeriggio") {
    const giornoSettimana = format(giorno, "i", { locale: it }); // 1 = lunedì, 7 = domenica
    if (giornoSettimana <= 6) {
      return [
        { specialistica: "Equipe Urgenza 1", infermieri: [] },
        { specialistica: "Equipe Urgenza 2", infermieri: [] }
      ];
    }
    return [];
  }


  // Sedute normali
  const dataStr = format(giorno, "yyyy-MM-dd");
  const tutteLeSedute = sedute[dataStr] || [];

  return tutteLeSedute.filter(s => s.fascia === fascia);
}
