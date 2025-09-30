import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrore("");

    if (!email || !password) {
      return setErrore("Inserisci email e password.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "richiesteAccesso", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return setErrore("Richiesta non trovata.");
      }

      const dati = docSnap.data();
      if (dati.stato !== "approvato") {
        return setErrore("Accesso non autorizzato. Attendi l'approvazione.");
      }

      if (typeof onLogin === "function") {
        onLogin();
      }

      navigate("/dashboard");
    } catch (error) {
      setErrore(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Benvenuta 👋</h2>
        <p style={styles.subtitle}>Accedi al pannello amministrativo</p>
        {errore && <p style={styles.error}>{errore}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Entra</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)"
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
    color: "#2c3e50",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#7f8c8d",
    textAlign: "center"
  },
  error: {
    color: "#e74c3c",
    fontSize: "0.9rem",
    textAlign: "center"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer"
  }
};
