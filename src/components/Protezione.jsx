import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";

export default function Protezione({ children }) {
  const [utente, setUtente] = useState(null);
  const [caricamento, setCaricamento] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUtente(user);
      setCaricamento(false);
    });
    return () => unsubscribe();
  }, []);

  if (caricamento) return null; // oppure un loader

  return utente ? children : <Navigate to="/" />;
}
