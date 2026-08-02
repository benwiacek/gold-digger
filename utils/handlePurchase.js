import path from "node:path"
import fs from "node:fs/promises"
import { parseJSON } from "./parseJSON.js"
import { price } from "../server.js"
import { formatPrice } from "../public/formatPrice.js"
import { formatGoldAmount } from "../public/formatGoldAmount.js"
import { exportPDF } from "./exportPDF.js"

export async function handlePurchase(req, res) {
    
    try {
        const parsedBody = await parseJSON(req)

        const goldPriceNumber = Number(price)
  	    const investmentNumber = Number(parsedBody)
        const timestamp = new Date().toISOString()

        if(!Number.isFinite(investmentNumber) || investmentNumber < 10 || investmentNumber > 1000000000000 ) {
            throw new Error ("Error: there was an issue with the number.")
        }

  	    const goldAmount = investmentNumber / goldPriceNumber

        const logArray = [
            `${timestamp}`,
            `amount paid: $${formatPrice(investmentNumber)}`,
            `price per Oz: $${formatPrice(goldPriceNumber)}`,
            `gold sold: ${formatGoldAmount(goldAmount)}.`
        ]

        const purchaseLog = logArray.join(", ") + "\n"

        const pathJSON = path.join("documents", "user_purchases.txt")

        await fs.appendFile(
            pathJSON,
            purchaseLog,
            "utf8"
        )

        const purchaseData = {
            finalGoldAmount: goldAmount,
            finalGoldPrice: goldPriceNumber,
            investment: investmentNumber,
            timestamp: timestamp
        }

        const filePath = path.join("public", "receipts", `Gold_purchase_${timestamp.replace(/[:.]/g, "-")}_receipt.pdf`)
        exportPDF(filePath, purchaseData)

        res.statusCode = 201
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(purchaseData))

    } catch (err) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end({error: err})
        throw new Error(err)
    }
    
}