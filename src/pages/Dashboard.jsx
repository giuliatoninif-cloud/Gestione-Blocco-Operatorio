import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import NotificheSettimana from "../components/NotificheSettimana";

function getSeduteSettimana(sedute) {
  const oggi = new Date();
  const lunedi = new Date(oggi);
  lunedi.setDate(oggi.getDate() - oggi.getDay() + 1);
  const domenica = new Date(lunedi);
  domenica.setDate(lunedi.getDate() + 6);

  return sedute.filter(s => {
    const dataSeduta = new Date(s.data);
    return dataSeduta >= lunedi && dataSeduta <= domenica;
  });
}

export default function Dashboard() {
  const [messaggi, setMessaggi] = useState([
    { id: 1, mittente: "", testo: "", data: "27/09/2025" },
    { id: 2, mittente: "", testo: "", data: "26/09/2025" }
  ]);

  const [sedute, setSedute] = useState([
    { id: 1, data: "2025-09-29", coperta: true },
    { id: 2, data: "2025-10-01", coperta: false },
    { id: 3, data: "2025-10-03", coperta: false },
    { id: 4, data: "2025-10-10", coperta: true }
  ]);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const controllaRuolo = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "richiesteAccesso", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().ruolo === "admin") {
        setIsAdmin(true);
      }
    };
    controllaRuolo();
  }, []);

  const saleScoperte = getSeduteSettimana(sedute).filter(s => !s.coperta).length;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Benvenuta Giulia 👩‍⚕️</h1>

      <NotificheSettimana saleScoperte={saleScoperte} />

      <h2>📨 I tuoi messaggi</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messaggi.map((msg) => (
          <li key={msg.id} style={{ background: "#f0f0f0", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
            <strong>{msg.mittente}</strong>
            <p>{msg.testo}</p>
            <small>{msg.data}</small>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#eaf4ff", borderRadius: "8px" }}>
          <h2>🔐 Sezione Amministratrice</h2>
          <p>Vai a <a href="/gestione-richieste">Gestione Richieste</a> per approvare gli accessi.</p>
        </div>
      )}
    </div>
  );
}
