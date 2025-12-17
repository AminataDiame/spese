export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Chiudi">✕</button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
