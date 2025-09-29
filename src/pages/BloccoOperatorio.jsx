import React from "react";

function BloccoOperatorio() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
     <h1 style={{
  fontSize: "2.5rem",
  fontWeight: "600",
  color: "#000",
  fontFamily: "Times New Roman, serif",
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  marginBottom: "1.5rem"
}}>
  👩‍⚕️ Blocco Operatorio
</h1>



      <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#333" }}>
        Qui puoi accedere alla documentazione condivisa del blocco operatorio.
      </p>

      <a
        href="https://sites.google.com/view/bloccooperatoriooa/home"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "#d3d9dfff",
          color: "#000",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        📂 Apri pagina Drive
      </a>
    </div>
  );
}

export default BloccoOperatorio;
