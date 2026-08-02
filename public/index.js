import { formatPrice } from "./formatPrice.js"
import { formatGoldAmount } from "./formatGoldAmount.js"

// === LIVE-PRICE DISPLAY ===

const eventSource = new EventSource("/price")

const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    priceDisplay.textContent = data.price
    connectionStatus.textContent = "Live Price 🟢"
}

eventSource.onerror = () => {
	console.log("Connection lost. Attempting to reconnect...")
    priceDisplay.textContent = "----.--"
    connectionStatus.textContent = "Disconnected 🔴"
}

// === PURCHASE CONFIRMATION ===

const investForm = document.getElementById("invest-form")
const dialog = document.getElementById("dialog")
const summary = document.getElementById("investment-summary")
const investment = document.getElementById("investment-amount")

investForm.addEventListener("submit", async function (e) {
	e.preventDefault()
	dialog.showModal()

  	const investmentNumber = Number(investment.value)

	// --- Sending data back to server for purchase log and certificate, receiving ---

	try {
		const res = await fetch("/purchase", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(investmentNumber)
		})

		if(!res.ok) {
			summary.innerHTML = "There was a problem with your purchase. Please try again."
			console.error("Server Error:", res.statusText)

		} else {

			const data = await res.json()
			const goldPriceNumber = data.finalGoldPrice
  			const goldAmount = data.finalGoldAmount
			const formattedGold = formatGoldAmount(goldAmount);

			summary.innerHTML =
				`You just bought ${formattedGold} of gold for $${formatPrice(investmentNumber)}.
				This sale is final.`

			const pdfBtn = document.getElementById("pdf-export-btn")

			pdfBtn.addEventListener("click", () => {
				const pdfUrl = `./receipts/GoldDigger_receipt_${(data.timestamp).replace(/[:.]/g, "-")}.pdf`

				const link = document.createElement("a")
				link.href = pdfUrl
				link.download = `GoldDigger_receipt_${(data.timestamp).replace(/[:.]/g, "-")}.pdf`

				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
			})
		}

	} catch (err) {
		console.log(`Error: ${err}`)
	}
})

const closeDialogBtn = document.getElementById("close-dialog-btn")

closeDialogBtn.addEventListener("click", () => {
	investForm.reset()
	dialog.close()
})