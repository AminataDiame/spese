// src/services/pocketbase.js
// Centralizziamo tutte le chiamate HTTP a PocketBase per tenere i componenti puliti.

// Base URL della collection "spese" su PocketBase (porta di default 8090)
const BASE_URL = "http://127.0.0.1:8090/api/collections/spesa/records";

/**
 * getSpese
 * - Recupera tutte le spese dalla collection 'spese'
 * - PocketBase restituisce { items: [...] }
 */
export async function getSpese() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Errore nel fetch delle spese");
  const data = await res.json();
  return data.items; // prendiamo l'array items
}

/**
 * createSpesa
 * - Crea una nuova spesa. 'spesa' dovrebbe avere { descrizione, importo, data }
 */
export async function createSpesa(spesa) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spesa)
  });
  if (!res.ok) throw new Error("Errore nella creazione della spesa");
  return await res.json(); // ritorna l'oggetto record creato
}

/**
 * deleteSpesa
 * - Elimina il record con l'id fornito
 */
export async function deleteSpesa(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Errore nella cancellazione della spesa");
}

