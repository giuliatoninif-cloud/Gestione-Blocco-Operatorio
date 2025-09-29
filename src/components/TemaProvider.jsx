import React, { createContext, useContext, useState } from "react";

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [tema, setTema] = useState("chiaro");
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error("useTema deve essere usato dentro TemaProvider");
  }
  return context;
}

