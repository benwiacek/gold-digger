// === LIVE-PRICE DISPLAY ===

const eventSource = new EventSource("/price")

const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

let goldPrice = ""

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    priceDisplay.textContent = data.price
    goldPrice = data.price
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

investForm.addEventListener("submit", (e) => {
	e.preventDefault()
	dialog.showModal()

  	const goldPriceNumber = Number(goldPrice.replace(/,/g, ''))
  	const investmentNumber = Number(investment.value)
  	const goldAmount = investmentNumber / goldPriceNumber

  	summary.innerHTML = `You just bought ${goldAmount.toFixed(3)} ounces (ozt) for $${investmentNumber.toLocaleString('en-US', {maximumFractionDigits: 0})}.
	You will receive documentation shortly.`
})

const closeDialogBtn = document.getElementById("close-dialog-btn")

closeDialogBtn.addEventListener("click", () => {
	dialog.close()
})

