const stili = {
  chiaro: {
    navbarContenuto: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem"
    },
    menu: {
      display: "flex",
      gap: "1rem",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    azioni: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center"
    },
    utente: {
      fontSize: "1rem",
      fontWeight: "bold"
    },
    navbar: {
      background: "linear-gradient(90deg, #1a2a6c, #1a2a6c)",
      padding: "1rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    },
    lista: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1rem",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    link: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      backgroundColor: "rgba(255,255,255,0.1)",
      transition: "all 0.3s ease"
    },
    attivo: {
      backgroundColor: "transparent",
      color: "#ad6363ff"
    },
    bottone: {
      backgroundColor: "#2980b9",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer"
    },
    titolo: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "#2c3e50"
    },
    paragrafo: {
      fontSize: "1.2rem",
      color: "#555"
    },
    sfondo: {
      backgroundColor: "#fefefe",
      color: "#2c3e50"
    }
  },

  scuro: {
    navbar: {
      background: "linear-gradient(90deg, #2c3e50, #34495e)",
      padding: "1rem",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
    },
    lista: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1rem",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    link: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#ecf0f1",
      textDecoration: "none",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      backgroundColor: "rgba(255,255,255,0.1)",
      transition: "all 0.3s ease"
    },
    attivo: {
      backgroundColor: "#1e3a5f"
,
      color: "#fff"
    },
    bottone: {
      backgroundColor: "#34495e",
      color: "#fff",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer"
    },
    titolo: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "#ecf0f1"
    },
    paragrafo: {
      fontSize: "1.2rem",
      color: "#ccc"
    },
    sfondo: {
      backgroundColor: "#1e1e1e",
      color: "#ecf0f1"
    }
  }
};

export default stili;
