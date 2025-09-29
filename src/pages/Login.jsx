import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTema } from "../components/TemaProvider";

import stili from "../stili";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conferma, setConferma] = useState("");
  const [modalita, setModalita] = useState("login");
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();
  const { tema } = useTema();

  const emailValida = email.includes("@") && email.includes(".");
  const passwordValida = password.length >= 6;
  const confermaValida = password === conferma;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValida) return setErrore("Email non valida");
    if (!passwordValida) return setErrore("Password troppo corta");
    if (modalita === "registrati" && !confermaValida) return setErrore("Le password non coincidono");

    setErrore("");
    onLogin(email);
    navigate("/");
  };

  return (
    <div style={{ ...stili[tema].sfondo, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: tema === "chiaro" ? "#fff" : "#2c3e50",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ ...stili[tema].titolo, textAlign: "center" }}>
          {modalita === "login" ? "Accedi" : "Registrati"}
        </h2>

        {errore && (
          <p style={{ color: "#e74c3c", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
            {errore}
          </p>
        )}

        <label style={{ ...stili[tema].paragrafo }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
            backgroundColor: tema === "chiaro" ? "#f9f9f9" : "#1e1e1e",
            color: stili[tema].sfondo.color
          }}
        />

        <label style={{ ...stili[tema].paragrafo }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
            backgroundColor: tema === "chiaro" ? "#f9f9f9" : "#1e1e1e",
            color: stili[tema].sfondo.color
          }}
        />

        {modalita === "registrati" && (
          <>
            <label style={{ ...stili[tema].paragrafo }}>Conferma Password</label>
            <input
              type="password"
              value={conferma}
              onChange={(e) => setConferma(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "1rem",
                backgroundColor: tema === "chiaro" ? "#f9f9f9" : "#1e1e1e",
                color: stili[tema].sfondo.color
              }}
            />
          </>
        )}

        <button type="submit" style={{ ...stili[tema].bottone, width: "100%", marginBottom: "1rem" }}>
          {modalita === "login" ? "Entra" : "Crea account"}
        </button>

        <p style={{ ...stili[tema].paragrafo, textAlign: "center" }}>
          {modalita === "login" ? "Non hai un account?" : "Hai già un account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setModalita(modalita === "login" ? "registrati" : "login");
              setErrore("");
            }}
            style={{
              background: "none",
              border: "none",
              color: tema === "chiaro" ? "#0078D4" : "#00B4D8",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {modalita === "login" ? "Registrati" : "Accedi"}
          </button>
        </p>
      </form>
    </div>
  );
}
