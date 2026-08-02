# GoldDigger
A gold investment simulator with live, randomly-fluctuating prices streamed to the browser in real time. Built entirely on native Node.js modules (no Express) to focus on core backend fundamentals: HTTP servers, static file serving, Server-Sent Events, and file-based persistence.
 
*No live demo — this project relies on a Node.js server (not static hosting) to handle routing, live price streaming, and file generation.*
 
## Features
 
* Live gold price updates streamed to the browser every few seconds via Server-Sent Events, with automatic reconnect handling and a connection status indicator
* Purchase flow where the server — not the client — calculates the final gold amount from the live price, preventing stale or manipulated values from reaching the receipt
* Every purchase is appended to a persistent text log (timestamp, amount paid, price per ounce, gold received)
* Auto-generated PDF receipt for each purchase, including a styled transaction summary table
* Mock email confirmation sent server-side after each purchase, using nodemailer's JSON transport (no real email is sent)
* Server-side input validation on investment amounts (rejects non-numeric, negative, zero, or unreasonably large values)

## Built with

Node.js (native `http`, `fs`, `path` modules), JavaScript, HTML, CSS, PDFKit, Nodemailer
 
## How it works
 
* A native `http.createServer` handler routes requests manually — static files, a `/price` SSE stream, and a `/purchase` POST endpoint — with no routing framework
* Gold price lives as a single in-memory variable on the server, updated on its own interval; the SSE handler reads that live value on a separate interval to push updates without ever recalculating or owning the price itself
* On purchase, the server re-derives the gold amount from its own live price (never trusting a client-calculated value), logs the transaction, generates a PDF receipt with PDFKit, and fires a mock confirmation email
* Shared formatting utilities (price formatting, ounce/kg/tonne conversion) are written once and imported by both server and browser code, since they contain no environment-specific logic
* Nested error handling ensures a broken or missing file (e.g. a missing 404 page) never crashes the server — it always falls back to a plain-text response
