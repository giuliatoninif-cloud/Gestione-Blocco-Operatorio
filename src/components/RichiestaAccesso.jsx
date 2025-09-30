import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function RichiestaAccesso() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [inviato, setInviato] = useState(false);

  const inviaRichiesta = async (e) => {
  e.preventDefault();
  setErrore("");

  if (!email || !password || !nome) {
    return setErrore("Compila tutti i campi.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "richiesteAccesso", user.uid), {
      email,
      nome,
      ruolo: "utente",
      stato: "in attesa"
    });

    setErrore("Richiesta inviata con successo ✅");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    setErrore(error.message);
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
