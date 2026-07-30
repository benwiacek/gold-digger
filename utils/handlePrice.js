export async function handlePrice(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    let price = (Math.random()*130 + 4000)

    setInterval( () => {
        price += ((Math.random() - 0.5)*6)

        res.write(
            `data: ${JSON.stringify({price: price.toFixed(2)})}\n\n`
        )

    }, 3000)
}