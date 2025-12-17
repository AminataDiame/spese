// src/App.jsx
import { useEffect, useState } from "react";
import { getSpese, createSpesa, deleteSpesa } from "./services/pocketbase";

import FormSpesa from "./components/FormSpesa";
import ListaSpese from "./components/ListaSpese";
import GraficoSpese from "./components/GraficoSpese";

export default function App() {
  const [spese, setSpese] = useState([]);

  useEffect(() => {
    getSpese()
      .then(items => setSpese(items))
      .catch(err => console.error("Errore fetch spese:", err));
  }, []);

  async function handleAddSpesa(nuovaSpesa) {
    try {
      const creata = await createSpesa(nuovaSpesa);
      setSpese(prev => [...prev, creata]);
    } catch (err) {
      console.error("Errore creazione spesa:", err);
    }
  }

  async function handleDeleteSpesa(id) {
    try {
      await deleteSpesa(id);
      setSpese(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Errore cancellazione:", err);
    }
  }

  return (
    <div className="app-root">
      <main className="main-container">
        <div className="spese-card">
          {/* Titolo principale */}
          <h1>Spese Tracker</h1>

          <div className="spese-content">
            {/* Colonna sinistra: form + lista */}
            <section className="col-left">
              <FormSpesa onAdd={handleAddSpesa} />
              <ListaSpese spese={spese} onDelete={handleDeleteSpesa} />
            </section>

            {/* Colonna destra: totale + grafico */}
            <aside className="col-right">
              <div className="totale-card">
                <h3>Totale Spese</h3>
                <p>
                  {spese.reduce((acc, s) => acc + Number(s.importo), 0).toFixed(2)} €
                </p>
              </div>
              <GraficoSpese spese={spese} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}



