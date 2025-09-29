const stili = {
  chiaro: {
    sfondo: { backgroundColor: "#fefefe", color: "#2c3e50" },
    titolo: { fontSize: "2rem", marginBottom: "1rem" },
    paragrafo: { fontSize: "1.2rem", color: "#555" },
    bottone: {
      backgroundColor: "#2980b9",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer"
    },
    cella: {
      backgroundColor: "#ffffff",
      color: "#2c3e50",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease",
      cursor: "pointer"
    },
    oggi: {
      border: "2px solid #0078D4",
      backgroundColor: "#e3f2fd"
    },
    weekend: {
      backgroundColor: "#fff8e1"
    },
    attivo: {
      backgroundColor: "#d1ffd6"
    },
    navbar: {
      backgroundColor: "#ecf0f1",
      padding: "1rem",
      borderBottom: "1px solid #ccc"
    },
    navbarContenuto: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    titoloNavbar: {
      fontSize: "1.5rem",
      fontWeight: "bold"
    },
    menu: {
      display: "flex",
      gap: "1rem",
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    link: {
      textDecoration: "none",
      color: "#2c3e50",
      fontWeight: "bold"
    },
    attivoLink: {
      borderBottom: "2px solid #2980b9"
    },
    azioni: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    },
    utente: {
      fontSize: "0.9rem",
      color: "#555"
    }
  },

  scuro: {
    sfondo: { backgroundColor: "#1e1e1e", color: "#ecf0f1" },
    titolo: { fontSize: "2rem", marginBottom: "1rem" },
    paragrafo: { fontSize: "1.2rem", color: "#ccc" },
    bottone: {
      backgroundColor: "#34495e",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer"
    },
    cella: {
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      transition: "transform 0.2s ease",
      cursor: "pointer"
    },
    oggi: {
      border: "2px solid #90caf9",
      backgroundColor: "#263238"
    },
    weekend: {
      backgroundColor: "#3e2723"
    },
    attivo: {
      backgroundColor: "#2e7d32"
    },
    navbar: {
      backgroundColor: "#1e1e1e",
      padding: "1rem",
      borderBottom: "1px solid #444"
    },
    navbarContenuto: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    titoloNavbar: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#ecf0f1"
    },
    menu: {
      display: "flex",
      gap: "1rem",
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    link: {
      textDecoration: "none",
      color: "#ecf0f1",
      fontWeight: "bold"
    },
    attivoLink: {
      borderBottom: "2px solid #90caf9"
    },
    azioni: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    },
    utente: {
      fontSize: "0.9rem",
      color: "#ccc"
    }
  }
};

export default stili;
