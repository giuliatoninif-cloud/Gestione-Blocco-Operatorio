import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

export default function GestioneRichieste() {
  const [richieste, setRichieste] = useState([]);
  const [autorizzato, setAutorizzato] = useState(false);

  const caricaRichieste = async () => {
    const querySnapshot = await getDocs(collection(db, "richiesteAccesso"));
    const dati = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setRichieste(dati);
  };

  const controllaRuolo = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "richiesteAccesso", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().ruolo === "admin") {
      setAutorizzato(true);
      caricaRichieste();
    }
  };

  const aggiornaStato = async (id, nuovoStato) => {
    const riferimento = doc(db, "richiesteAccesso", id);
    await updateDoc(riferimento, { stato: nuovoStato });
    caricaRichieste();
  };

  useEffect(() => {
    if (richieste.some(r => r.stato === "in attesa")) {
      alert("📬 Nuova richiesta di accesso in attesa di approvazione!");
    }
  }, [richieste]);

  useEffect(() => {
    controllaRuolo();
  }, []);

  if (!autorizzato) {
    return <p>Accesso negato. Solo l'amministratore può gestire le richieste.</p>;
  }

  return (
    <div>
      <h2>Gestione Richieste di Accesso</h2>
      {richieste.length === 0 ? (
        <p>Nessuna richiesta trovata.</p>
      ) : (
        <ul>
          {richieste.map((r) => (
            <li key={r.id}>
              <strong>{r.nome || "Utente"}</strong> ({r.email}) —{" "}
              <span
                style={{
                  backgroundColor:
                    r.ruolo === "admin" ? "#3498db" :
                    r.stato === "approvato" ? "#2ecc71" :
                    "#f39c12",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.8rem"
                }}
              >
                {r.ruolo === "admin" ? "Admin" : r.stato}
              </span>
              {r.stato === "in attesa" && (
                <>
                  <button onClick={() => aggiornaStato(r.id, "approvato")}>Approva</button>
                  <button onClick={() => aggiornaStato(r.id, "rifiutato")}>Rifiuta</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

