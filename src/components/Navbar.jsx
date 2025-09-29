import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTema } from "./TemaProvider";
import stili from "../stili";

export default function Navbar({ utente, onLogout }) {
  const location = useLocation();
  const { tema, toggleTema } = useTema();

  const voci = [
    { label: "🏠 Home", path: "/home" },
    { label: "🏥 Blocco", path: "/blocco" },
    { label: "📅 Griglia mensile", path: "/griglia" },
    { label: "🧑‍⚕️ Infermieri", path: "/infermieri" },
    
  ];

  return (
    <nav style={stili[tema].navbar}>
      <div style={stili[tema].navbarContenuto}>
        <h2 style={stili[tema].titolo}>Giulia 👩‍⚕️</h2>

        <ul style={stili[tema].menu}>
          {voci.map(voce => (
            <li key={voce.path}>
              <Link
                to={voce.path}
                style={{
                  ...stili[tema].link,
                  ...(location.pathname === voce.path ? stili[tema].attivo : {})
                }}
              >
                {voce.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={stili[tema].azioni}>
          {utente && <span style={stili[tema].utente}>👤 {utente}</span>}
          {utente && (
            <button style={stili[tema].bottone} onClick={onLogout}>
              Esci
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
