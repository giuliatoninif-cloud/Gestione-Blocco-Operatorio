import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function RichiestaAccesso() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [inviato, setInviato] = useState(false);

  const inviaRichiesta = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "richiesteAccesso"), {
        nome,
        email,
        stato: "in attesa",
        timestamp: new Date()
      });
      setInviato(true);
    } catch (error) {
      console.error("Errore nell'invio:", error);
    }
  };

  return (
    <div>
      <h2>Richiesta di Accesso</h2>
      {inviato ? (
        <p>Richiesta inviata! Attendi l'approvazione da parte dell'amministratore.</p>
      ) : (
        <form onSubmit={inviaRichiesta}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Invia richiesta</button>
        </form>
      )}
    </div>
  );
}
