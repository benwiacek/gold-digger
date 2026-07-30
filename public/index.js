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