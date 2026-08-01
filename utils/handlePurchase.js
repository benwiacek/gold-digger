import path from "node:path"
import fs from "node:fs/promises"
import { parseJSON } from "./parseJSON.js"
import { price } from "../server.js"

export async function handlePurchase(req, res) {
    
    try {
        const parsedBody = await parseJSON(req)

        const goldPriceNumber = Number(price)
  	    const investmentNumber = Number(parsedBody)
  	    const goldAmount = investmentNumber / goldPriceNumber

        const logArray = [
            `${new Date().toISOString()}`,
            `amount paid: $${investmentNumber.toLocaleString('en-US', {maximumFractionDigits: 0})}`,
            `price per Oz: $${goldPriceNumber.toLocaleString('en-US', {maximumFractionDigits: 2})}`,
            `gold sold: ${goldAmount.toFixed(3)} Oz.`
        ]

        const purchaseLog = logArray.join(", ") + "\n"

        const pathJSON = path.join("documents", "user_purchases.txt")

        await fs.appendFile(
            pathJSON,
            purchaseLog,
            "utf8"
        )
        res.statusCode = 201
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(purchaseLog))

    } catch (err) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end({error: err})
        throw new Error(err)
    }
    
}