// src/components/FormSpesa.jsx
import { useState } from "react";
import Card from "./card";

/*
FormSpesa:
- gestisce il proprio stato per i campi
- alla submit invoca onAdd (passato dal genitore)
- NON esegue fetch direttamente (principio richiesto dalla consegna)
*/
export default function FormSpesa({ onAdd }) {
  const [descrizione, setDescrizione] = useState("");
  const [importo, setImporto] = useState("");
  const [data, setData] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // costruisce l'oggetto spesa
    // costruisci un ISO con orario fissato a mezzogiorno UTC per evitare shift di fuso orario
    // data arriva in formato YYYY-MM-DD dal campo date
    const [y, m, d] = data.split("-");
    const isoDate = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), 12, 0, 0)).toISOString();

    const spesa = {
      descrizione: descrizione.trim(),
      importo: Number(importo),
      data: isoDate
    };

    // chiama la funzione ricevuta via props (App.jsx si occuperà del POST)
    onAdd(spesa);

    // pulizia dei campi
    setDescrizione("");
    setImporto("");
    setData("");
  }

  return (
    <Card>
      <h3>Aggiungi una spesa</h3>
      <form onSubmit={handleSubmit} className="form-spesa">
        <input
          type="text"
          placeholder="Descrizione"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Importo (es. 12.50)"
          value={importo}
          onChange={(e) => setImporto(e.target.value)}
          required
          step="0.01"
        />
        <input
          type="date"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit">Aggiungi</button>
      </form>
    </Card>
  );
}
