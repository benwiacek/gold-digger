import path from "node:path"
import fs from "node:fs/promises"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(res, req, baseDir) {
    const publicDir = path.join(baseDir, "public")
    const filePath = path.join(publicDir, req.url === "/" ? "index.html" : req.url)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)

    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)

    } catch (err) {
        if(err.code === "ENOENT") {
            try {
                const content = await fs.readFile(path.join(publicDir, "404.html"))
                sendResponse(res, 404, "text/html", content)
            } catch {
                sendResponse(res, 404, "text/html", "<html><h1>Page not Found.</h1></html>")
            }

        } else {
            sendResponse(res, 500, "text/html", 
                "<html><h1>Server Error</h1><p>Oops, the server had a problem answering your request, try again later.</p></html>")
        }
    }
}