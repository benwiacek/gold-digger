import http from 'node:http'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer((req, res) => {

    if(req.url === "/index")

})

server.listen(PORT, () => console.log(`Server is connected on port ${PORT}.`))