import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RichiestaAccesso() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();

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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Richiesta Accesso</h2>
      <form onSubmit={inviaRichiesta} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Invia richiesta</button>
        {errore && <p style={{ color: errore.includes("✅") ? "green" : "red" }}>{errore}</p>}
      </form>
    </div>
  );
}
