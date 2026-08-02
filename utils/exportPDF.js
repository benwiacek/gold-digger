import PDFDocument from "pdfkit"
import fs from "node:fs"

import { formatPrice } from "../public/formatPrice.js"
import { formatGoldAmount } from "../public/formatGoldAmount.js"

export function exportPDF(filename, data) {

    const receipt = new PDFDocument()

    receipt.pipe(fs.createWriteStream(filename))

    receipt.font("Helvetica-Bold")
        .fontSize(24)
        .text("Transaction Receipt", {
            align: "center"
        })

    receipt.moveDown(2)
        
    receipt.font("Helvetica")
        .fontSize(20)
        .table({
            defaultStyle: { border: 1, borderColor: "gray" },
            columnStyles: (i) => {
                if (i === 0) return { border: { left: 2 }, borderColor: { left: "black" } };
                if (i === 2) return { border: { right: 2 }, borderColor: { right: "black" } };
            },
            rowStyles: (i) => {
                if (i === 0) return { border: { top: 2 }, borderColor: { top: "black" } };
                if (i === 1) return { border: { bottom: 2 }, borderColor: { bottom: "black" } };
            },
            data: [
                ["Price per ozt of gold", "Amount of gold received", "Price paid"],
                [`$${formatPrice(data.finalGoldPrice)}`, `${formatGoldAmount(data.finalGoldAmount)}`, `$${formatPrice(data.investment)}`]
            ]
        })

    receipt.moveDown(2)

    receipt.font("Helvetica-Oblique")
        .fontSize(16)
        .text(`Date of transaction: ${data.timestamp.toLocaleString('en-US')}`)

    receipt.moveDown(1)

    receipt.font("Helvetica-Oblique")
        .fontSize(18)
        .text("This sale is final.")

    receipt.end()
}