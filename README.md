# 💰 Spese Tracker

> 🎯 Una moderna applicazione web per tracciare e gestire le tue spese personali con stile dark e interfaccia intuitiva.

[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.2-9945ff?style=flat-square&logo=vite)](https://vitejs.dev)
[![PocketBase](https://img.shields.io/badge/PocketBase-backend-orange?style=flat-square)](https://pocketbase.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Caratteristiche

- 🌙 **Dark Theme Moderno** — Interfaccia elegante e riposante per gli occhi
- 📊 **Grafici Interattivi** — Visualizza la distribuzione delle spese con un doughnut chart professionale
- 📅 **Date Selezionabili** — Inserisci manualmente la data di ogni spesa
- 🎨 **Responsive Design** — Perfetto su desktop, tablet e mobile
- 💾 **Sincronizzazione in Tempo Reale** — Dati salvati su PocketBase
- 🔍 **Popup Dettagliati** — Clicca su una spesa per visualizzare tutti i dettagli
- 📈 **Riepilogo Totali** — Vedi immediatamente il totale delle spese
- ⚡ **Performance Ottimizzate** — Built con Vite per fast refresh e build veloce

---

## 🚀 Quickstart

### Prerequisiti
- **Node.js** (v16+)
- **npm** o **yarn**
- **PocketBase** (server locale sulla porta 8090)

### Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/username/spese.git
   cd spese
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura PocketBase**
   - Scarica [PocketBase](https://pocketbase.io) dal sito ufficiale
   - Estrai e avvia il server locale:
     ```bash
     ./pocketbase serve
     ```
   - Accedi a `http://127.0.0.1:8090/_/` e crea una nuova collection `spesa` con i campi:
     - `descrizione` (text)
     - `importo` (number)
     - `data` (date/time)
   - Abilita l'accesso pubblico alla collection (List, Create, Update, Delete)

4. **Avvia il dev server**
   ```bash
   npm run dev
   ```
   - Apri `http://localhost:5173` nel browser

---

## 📚 Utilizzo

### Aggiungere una Spesa

1. Compila il form in alto a sinistra:
   - **Descrizione** — Es: "Cena al ristorante", "Benzina"
   - **Importo** — Es: `25.50` (con due decimali)
   - **Data** — Seleziona dal calendario
2. Clicca **"Aggiungi"**
3. La spesa appare immediatamente nella lista e il grafico si aggiorna

### Visualizzare Dettagli

- Clicca su una riga nella lista spese per aprire un popup con:
  - Descrizione completa
  - Importo (formattato con due decimali)
  - Data esatta
  - ID del record

### Eliminare una Spesa

- **Dalla lista**: Clicca il bottone **"Elimina"** sulla destra
- **Dal popup**: Clicca il bottone **"Elimina"** nel modale

### Visualizzare il Grafico

- A destra della lista vedrai un **Doughnut Chart** che mostra:
  - Distribuzione delle spese per categoria
  - Percentuali visibili (solo per slice ≥ 5%)
  - Legenda interattiva sotto il grafico
  - **Totale spese** al centro del donut

---

## 🛠️ Stack Tecnologico

| Tecnologia | Versione | Ruolo |
|-----------|----------|-------|
| **React** | 19.2.0 | UI Framework |
| **Vite** | 7.2.4 | Build tool & Dev server |
| **Recharts** | 3.4.1 | Grafici interattivi |
| **PocketBase** | — | Backend & Database |
| **ESLint** | 9.39.1 | Code quality |

---

## 📁 Struttura del Progetto

```
spese/
├── src/
│   ├── components/
│   │   ├── FormSpesa.jsx        # Form per inserire nuove spese
│   │   ├── ListaSpese.jsx       # Elenco delle spese
│   │   ├── ItemSpesa.jsx        # Singola riga spesa + popup
│   │   ├── GraficoSpese.jsx     # Doughnut chart Recharts
│   │   ├── Modal.jsx            # Componente modale riutilizzabile
│   │   └── card.jsx             # Wrapper card per contenuti
│   ├── services/
│   │   └── pocketbase.js        # API client per PocketBase
│   ├── styles/
│   │   └── app.css              # Tema dark e stili globali
│   ├── App.jsx                  # Componente root
│   └── main.jsx                 # Entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md                    # Questo file
```

---

## 🎨 Design & Tema

### Tavolozza Colori (Dark Mode)
- **Background**: `#0b0f14`
- **Card**: `#0f1724`
- **Accent Primario**: `#6ea8fe` (blu)
- **Accent Secondario**: `#7de3c9` (teal)
- **Testo**: `#e6eef3`
- **Muted**: `#9aa6b2`
- **Danger**: `#ff6b6b` (rosso)

### Font
- **Principale**: Inter (sistema fallback: system-ui, Arial)
- **Secondary**: Space Grotesk

---

## 🔧 Comandi Disponibili

```bash
# Avvia dev server con HMR
npm run dev

# Build per produzione
npm run build

# Preview della build
npm run preview

# Lint del codice
npm run lint
```

---

## 📊 Funzionalità dei Grafici

### Doughnut Chart
- ✅ **Percentuali**: Mostrate solo per slice ≥ 5% per evitare affollamento
- ✅ **Etichette Esterne**: Per slice < 5% le percentuali compaiono fuori con connettore
- ✅ **Legenda**: Interattiva, con nomi delle categorie
- ✅ **Tooltip**: Al passaggio del mouse mostra descrizione e valore

### Totale Spese
- Calcolato automaticamente dalla somma di tutti gli importi
- Aggiornato in tempo reale

---

## 🔐 PocketBase Setup Dettagliato

### 1. Creare la Collection `spesa`

1. Accedi a `http://127.0.0.1:8090/_/`
2. Accedi con credenziali di test (es: `test@example.com` / `password`)
3. Vai a **Collections** e crea una nuova collection:
   - Nome: `spesa`
   - Campi:
     ```
     - id (auto)
     - created (auto)
     - updated (auto)
     - descrizione (text, required)
     - importo (number, required)
     - data (date/time, required)
     ```

### 2. Impostare i Permessi

1. Vai su **Collections** > **spesa** > **API Rules**
2. Imposta i seguenti permessi pubblici:
   - **List**: `true`
   - **View**: `true`
   - **Create**: `true`
   - **Update**: `true`
   - **Delete**: `true`

### 3. Verificare la Connessione

L'app usa `http://127.0.0.1:8090/api/collections/spesa/records` come endpoint.
Se usi una configurazione diversa, modifica l'URL in `src/services/pocketbase.js`.

---

## 💡 Consigli di Utilizzo

### Per Categorie Personali
- Usa la descrizione come categoria (es: "🍕 Cibo", "🚗 Trasporto", "💊 Medicina")
- Il grafico raggrupperà automaticamente per descrizione

### Per Analisi Storiche
- Usa il popup per vedere i dettagli di ogni spesa
- Clicca sulla legenda del grafico per isolare categorie specifiche

### Per Backup
- Esporta i dati regolarmente da PocketBase (opzionale)

---

## 🐛 Troubleshooting

### Errore: "Errore nel fetch delle spese"
**Causa**: PocketBase non è in esecuzione o non è raggiungibile.
**Soluzione**:
1. Verifica che PocketBase sia avviato: `./pocketbase serve`
2. Assicurati che sia in esecuzione su `http://127.0.0.1:8090`
3. Controlla la console del browser (F12) per dettagli dell'errore

### Le spese non vengono salvate
**Causa**: Permessi insufficienti in PocketBase.
**Soluzione**:
1. Accedi a `http://127.0.0.1:8090/_/`
2. Verifica che l'API Rule per "Create" sia impostata a `true`
3. Assicurati che il campo `data` sia una data/time valida

### Il grafico non si aggiorna
**Causa**: Raccolte dati duplicate o non aggregate.
**Soluzione**:
1. Aggiorna la pagina (F5)
2. Verifica che le descrizioni siano corrette (una piccola variazione fa differenza)

---

## 🎯 Roadmap Futura

- [ ] Filtri temporali (settimana, mese, anno)
- [ ] Esportazione in CSV/PDF
- [ ] Autenticazione utente multi-profilo
- [ ] Sincronizzazione cloud
- [ ] Tema chiaro (toggle)
- [ ] Notifiche e promemoria
- [ ] Budget tracking e goal

---

## 🤝 Contributi

Le pull request sono benvenute! Per modifiche significative:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Fai un push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📄 Licenza

Questo progetto è distribuito sotto la licenza **MIT**. Vedi il file `LICENSE` per dettagli.

---

## 🙋 Supporto

Hai domande o hai trovato un bug? 
- 📧 Apri una **Issue** su GitHub
- 💬 Contatta lo sviluppatore

---

## 🎉 Ringraziamenti

- **React** — Per il fantastico framework UI
- **Vite** — Per lo sviluppo super veloce
- **Recharts** — Per i grafici professionali
- **PocketBase** — Per il backend semplice e potente
- **Community** — Per l'ispirazione e il feedback

---

**Made with ❤️ by [Your Name]**

Last updated: December 2025 | Version: 1.0.0
