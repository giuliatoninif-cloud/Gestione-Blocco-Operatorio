
import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GrigliaMensileDeluxe } from "./components";
import FormSedutaModal from "./components/FormSedutaModal";
import ModificaSedutaModal from "./components/ModificaSedutaModal";
import { competenze } from "./data/competenze";
import { useTema } from "./components/TemaProvider";
import EsportaPDF from "./components/EsportaPDF";
import TestComponent from "./components/TestComponent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GestioneInfermieri from "./pages/GestioneInfermieri";
import BloccoOperatorio from "./pages/BloccoOperatorio";
import PlanningSettimana from "./components/PlanningSettimana";
import parseDataLocale from "./utils/parseDataLocale";
import RiepilogoMessaggi from "./components/RiepilogoMessaggi";
import NotificheSettimana from "./components/NotificheSettimana";
import Home from "./pages/Home";
import RichiestaAccesso from "./components/RichiestaAccesso";

import GestioneRichieste from "./components/GestioneRichieste";
import Protezione from "./components/Protezione";

export default function App() {
  const { tema } = useTema();
const [turni, setTurni] = useState([]);


  const [autenticata, setAutenticata] = useState(() => {
    const salvata = localStorage.getItem("autenticata");
    return salvata === "true";
  });

  const [sedute, setSedute] = useState(() => {
    const salvate = localStorage.getItem("sedute");
    return salvate ? JSON.parse(salvate) : [];
  });

  useEffect(() => {
    localStorage.setItem("sedute", JSON.stringify(sedute));
  }, [sedute]);

  const [infermieri, setInfermieri] = useState(() => {
    const salvati = localStorage.getItem("infermieri");
    return salvati ? JSON.parse(salvati) : [];
  });

  useEffect(() => {
    localStorage.setItem("infermieri", JSON.stringify(infermieri));
  }, [infermieri]);

  const [modalAperta, setModalAperta] = useState(false);
  const [modalTipo, setModalTipo] = useState("aggiungi");
  const [sedutaCorrente, setSedutaCorrente] = useState(null);

  const [giornoDaEsportare, setGiornoDaEsportare] = useState(() => {
    const oggi = new Date();
    oggi.setHours(12, 0, 0, 0);
    return oggi;
  });

  const onAggiungi = (data) => {
    const giornoLocale = parseDataLocale(data);
    const nuovaSeduta = {
      data: giornoLocale,
      fascia: "mattina",
      specialistica: "",
      nota: "",
      coperta: true,
      noAnestesia: false
    };

    setSedutaCorrente(nuovaSeduta);
    setModalTipo("aggiungi");
    setModalAperta(true);
    setGiornoDaEsportare(giornoLocale);
  };

  const salvaSeduta = (nuovaSeduta) => {
    const aggiornata = { ...nuovaSeduta, id: nuovaSeduta.id || Date.now() };
    setSedute(prev => {
      const senzaVecchia = prev.filter(s => s.id !== aggiornata.id);
      return [...senzaVecchia, aggiornata];
    });
    setModalAperta(false);
  };

  const aggiornaSeduta = (sedutaModificata) => {
    setSedute(prev =>
      prev.map(s => s.id === sedutaModificata.id ? sedutaModificata : s)
    );
  };

  const eliminaSeduta = (id) => {
    const aggiornate = sedute.filter(s => s.id !== id);
    setSedute(aggiornate);
    localStorage.setItem("sedute", JSON.stringify(aggiornate));
  };

  const [messaggi, setMessaggi] = useState([]);
  const aggiungiMessaggio = msg => {
    setMessaggi(prev => [...prev, msg]);
  };

  if (!autenticata) {
    return (
      <Login
        onLogin={() => {
          setAutenticata(true);
          localStorage.setItem("autenticata", "true");
        }}
      />
    );
  }

  return (
    <>
    
      <Navbar
        utente="Giulia"
        onLogout={() => {
          setAutenticata(false);
          localStorage.removeItem("autenticata");
        }}
      />
      <Routes>
        <Route path="/home" element={<Home sedute={sedute} />} />
<Route
  path="/dashboard"
  element={
    <Protezione>
      <Dashboard />
    </Protezione>
  }
/>
<Route
  path="/gestione-richieste"
  element={
    <Protezione>
      <GestioneRichieste />
    </Protezione>
  }
/>
        <Route path="/" element={<Navigate to="/home" />} />
      
        <Route
          path="/griglia"
          element={
            <>
              <h1 style={{ padding: "2rem" }}>Programmazione Sale</h1>

              <EsportaPDF
                sedute={sedute}
                giorno={giornoDaEsportare}
                setGiorno={setGiornoDaEsportare}
              />

              <GrigliaMensileDeluxe
                sedute={sedute}
                onModifica={(s) => {
                  setSedutaCorrente(s);
                  setModalTipo("modifica");
                  setModalAperta(true);

                  const giornoCorretto =
                    typeof s.data === "string"
                      ? parseDataLocale(s.data)
                      : new Date(s.data);

                  giornoCorretto.setHours(12, 0, 0, 0);
                  setGiornoDaEsportare(giornoCorretto);
                }}
                onAggiungi={onAggiungi}
                onElimina={eliminaSeduta}
                tema={tema}
                setGiornoDaEsportare={setGiornoDaEsportare}
              />

              {modalAperta && modalTipo === "aggiungi" && (
                <FormSedutaModal
                  seduta={sedutaCorrente}
                  giornoSelezionato={sedutaCorrente?.data}
                  infermieri={infermieri}
                  competenze={competenze}
                  sedute={sedute}
                  onSave={salvaSeduta}
                  onClose={() => setModalAperta(false)}
                />
              )}


              {modalAperta && modalTipo === "modifica" && (
                <ModificaSedutaModal
                  seduta={sedutaCorrente}
                  infermieri={infermieri}
                  competenze={competenze}
                  sedute={sedute}
                  onSave={aggiornaSeduta}
                  onClose={() => setModalAperta(false)}
                />
              )}

              <TestComponent />
            </>
          }
        />
        <Route
          path="/infermieri"
          element={
            <GestioneInfermieri
              infermieri={infermieri}
              setInfermieri={setInfermieri}
            />
          }
        />
        <Route path="/richiesta-accesso" element={<RichiestaAccesso />} />
        <Route path="/blocco" element={<BloccoOperatorio />} />
        <Route path="/planning" element={<PlanningSettimana sedute={sedute} />} />
        <Route
          path="/messaggi"
          element={
            <>
              <NotificheSettimana saleScoperte={sedute.filter(s => !s.coperta).length} />
              <RiepilogoMessaggi messaggi={messaggi} />
            </>
          }
        />
      </Routes>
    </>
  );
}
