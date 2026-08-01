import http from 'node:http'
import { serveStatic } from "./utils/serveStatic.js"
import { handlePrice } from "./utils/handlePrice.js"
import { handlePurchase } from "./utils/handlePurchase.js"

const PORT = 8000

const __dirname = import.meta.dirname

export let price = (Math.random()*130 + 4000)

setInterval( () => {
    price += ((Math.random() - 0.5)*6)
}, 3000)

const server = http.createServer( async (req, res) => {

    if(req.url === "/price") {
        return await handlePrice(req, res)
    }

    else if(req.url === "/purchase" && req.method === "POST") {
        return await handlePurchase(req, res)
    }

    else {
        return await serveStatic(res, req, __dirname)
    }

})

server.listen(PORT, () => console.log(`Server is connected on port ${PORT}.`))