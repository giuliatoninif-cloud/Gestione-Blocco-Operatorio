import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormSedutaModal from "./FormSedutaModal";
import ElencoSedute from "./ElencoSedute";

function GiornoCard({ giorno, nomeGiorno, sedute, setSedute, infermieri }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toastVisibile, setToastVisibile] = useState(false);

  const dataStr = giorno.toISOString().split("T")[0];
  const seduteDelGiorno = sedute.filter(s => s.data === dataStr);

  const apriModal = (fascia, urgente, sedutaDaModificare = null) => {
    setModalData({ giorno, fascia, urgente, sedutaDaModificare });
    setModalOpen(true);
  };

  const chiudiModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const mostraToast = () => {
    setToastVisibile(true);
    setTimeout(() => setToastVisibile(false), 3000);
  };

  const aggiungiSeduta = (giorno, fascia, urgente, nuovaSeduta) => {
    const dataStr = giorno.toISOString().split("T")[0];
    const sedutaCompleta = {
      ...nuovaSeduta,
      data: dataStr,
      fascia,
      urgente
    };
    setSedute(prev => [...prev, sedutaCompleta]);
    mostraToast();
    chiudiModal();
  };

  const modificaSeduta = (vecchia, nuova) => {
    setSedute(prev => prev.map(s => s === vecchia ? { ...s, ...nuova } : s));
    mostraToast();
    chiudiModal();
  };

  const eliminaSeduta = (seduta) => {
    setSedute(prev => prev.filter(s => s !== seduta));
    mostraToast();
  };

  return (
    <div style={stili.card}>
      <div style={stili.intestazione}>
        <div>{nomeGiorno}</div>
        <div>{giorno.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</div>
        <div>{seduteDelGiorno.length} sedute</div>
      </div>

      <ElencoSedute
        sedute={sedute}
        giorno={giorno}
        onAggiungi={(fascia, urgente) => apriModal(fascia, urgente)}
      />

      {modalOpen && modalData && ReactDOM.createPortal(
        <FormSedutaModal
          data={modalData.giorno}
          fascia={modalData.fascia}
          urgente={modalData.urgente}
          sedutaDaModificare={modalData.sedutaDaModificare}
          infermieriDisponibili={infermieri}
          sedute={sedute}
          onSalva={(nuovaSeduta) => {
            if (modalData.sedutaDaModificare) {
              modificaSeduta(modalData.sedutaDaModificare, nuovaSeduta);
            } else {
              aggiungiSeduta(modalData.giorno, modalData.fascia, modalData.urgente, nuovaSeduta);
            }
          }}
          onChiudi={chiudiModal}
        />,
        document.getElementById("modal-root")
      )}

      {toastVisibile && (
        <div style={stili.toast}>✅ Seduta salvata con successo!</div>
      )}
    </div>
  );
}

const stili = {
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 0 6px rgba(0,0,0,0.05)",
    minWidth: "220px",
    position: "relative"
  },
  intestazione: {
    marginBottom: "1rem",
    fontWeight: "bold",
    fontSize: "0.95rem",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem"
  },
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "0.8rem 1.2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    fontSize: "0.95rem",
    zIndex: 9999,
    animation: "fadeInOut 3s ease-in-out"
  }
};

export default GiornoCard;
