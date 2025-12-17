// src/components/ListaSpese.jsx
import Card from "./card";
import ItemSpesa from "./ItemSpesa";

export default function ListaSpese({ spese, onDelete }) {
  return (
    <Card>
  <h3>Le tue spese</h3>

  <div className="table-header">
    <span>Data</span>
    <span>Descrizione</span>
    <span>Importo</span>
    <span>Azioni</span>
  </div>

  {spese.length === 0 ? (
    <p>Nessuna spesa ancora</p>
  ) : (
    <ul className="lista-spese">
      {spese.map((s) => (
        <ItemSpesa key={s.id} spesa={s} onDelete={onDelete} />
      ))}
    </ul>
  )}
</Card>
  );
}
