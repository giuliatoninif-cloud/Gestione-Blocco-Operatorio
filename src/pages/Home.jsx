import React from "react";
import stili from "../stili";

import { useTema } from "../components/TemaProvider";


export default function Home() {
  const { tema, toggleTema } = useTema();

  return (
    <div style={{ ...stili[tema].sfondo, padding: "2rem", textAlign: "center" }}>
      <img
  src="/strumenti.jpeg"
  alt="Strumenti chirurgici"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          marginBottom: "2rem"
        }}
      />
      <h1 style={stili[tema].titolo}>Benvenuta Giulia 👩‍⚕️</h1>
      <p style={stili[tema].paragrafo}>
        Gestisci le tue sedute chirurgiche con precisione e semplicità.
      </p>
      
    </div>
  );
}
