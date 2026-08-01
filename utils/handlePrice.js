import { price } from "../server.js"

export async function handlePrice(req, res) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    const options = { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    setInterval( () => {
        res.write(
            `data: ${JSON.stringify({
                event: "live gold price",
                price: price.toLocaleString('en-US', options)
            })}\n\n`
        )
    }, 3000)

}