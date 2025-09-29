import React, { useState } from "react";
import NotificheSettimana from "../components/NotificheSettimana";

function getSeduteSettimana(sedute) {
  const oggi = new Date();
  const lunedi = new Date(oggi);
  lunedi.setDate(oggi.getDate() - oggi.getDay() + 1); // lunedì
  const domenica = new Date(lunedi);
  domenica.setDate(lunedi.getDate() + 6); // domenica
const seduteSettimana = getSeduteSettimana(sedute);
const saleScoperte = seduteSettimana.filter(s => !s.coperta).length;

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
  { id: 4, data: "2025-10-10", coperta: true } // fuori dalla settimana
]);


  const saleScoperte = sedute.filter(s => !s.coperta).length;

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
    </div>
  );
}

