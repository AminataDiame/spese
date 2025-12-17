// src/components/Card.jsx
// Card semplice e riutilizzabile: fornisce sfondo, padding e shadow.
// Usa children per incapsulare qualsiasi contenuto.
export default function Card({ children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}
