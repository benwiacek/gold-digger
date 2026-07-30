import http from 'node:http'
import { serveStatic } from "./utils/serveStatic.js"
import { handlePrice } from "./utils/handlePrice.js"

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer( async (req, res) => {

    if(req.url === "/price") {
        return await handlePrice(req, res)
    }

    else {
        return await serveStatic(res, req, __dirname)
    }

})

server.listen(PORT, () => console.log(`Server is connected on port ${PORT}.`))