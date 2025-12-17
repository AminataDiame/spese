// src/components/ItemSpesa.jsx
import { useState } from "react";
import Modal from "./Modal";

function formatDateOnly(dateStr) {
  if (!dateStr) return "";
  // Try parsing as ISO or other standard formats
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split("T")[0];
  }
  // Fallback: split on T or space
  return dateStr.split("T")[0].split(" ")[0];
}

export default function ItemSpesa({ spesa, onDelete }) {
  // spesa: record di PocketBase, contiene id, descrizione, importo, data
  const date = formatDateOnly(spesa.data);
  const [open, setOpen] = useState(false);

  function formatAmount(value) {
    const n = Number(value) || 0;
    return n.toFixed(2);
  }

  return (
    <>
      <li className="item-row" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <div className="col-date">{date}</div>
        <div className="col-desc">{spesa.descrizione}</div>
        <div className="col-amount">{formatAmount(spesa.importo)} €</div>
        <div className="col-actions">
          <button
            className="delete"
            onClick={(e) => { e.stopPropagation(); onDelete(spesa.id); }}
          >
            Elimina
          </button>
        </div>
      </li>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3 style={{ marginTop: 0 }}>{spesa.descrizione}</h3>
          <p><strong>Importo:</strong> {formatAmount(spesa.importo)} €</p>
          <p><strong>Data:</strong> {date}</p>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}><strong>ID:</strong> {spesa.id}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="delete" onClick={() => { onDelete(spesa.id); setOpen(false); }}>Elimina</button>
            <button onClick={() => setOpen(false)} style={{ padding: '8px 12px', borderRadius: 8 }}>Chiudi</button>
          </div>
        </Modal>
      )}
    </>
  );
}
