const eventSource = new EventSource("/price")

const priceDisplay = document.getElementById("price-display")

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    priceDisplay.textContent = data.price
}

eventSource.onerror = () => {
  console.log("Connection lost. Attempting to reconnect...")
}