import nodemailer from "nodemailer"

import { formatPrice } from "../public/formatPrice.js"
import { formatGoldAmount } from "../public/formatGoldAmount.js"

export async function sendEmailConfirm(data) {
    const transport = nodemailer.createTransport({
        jsonTransport: true
    })

    const email = {
        from: "info@golddigger.com",
        to: "client@test.com",
        subject: "Purchase confirmation",
        text: `
            Thank you for your purchase.
            You have received ${formatGoldAmount(data.finalGoldAmount)}, at $${formatPrice(data.finalGoldPrice)}, for a total price of $${formatPrice(data.investment)}.
        `
    }

    try {
        const info = await transport.sendMail(email)
        console.log("Email was sent:", info.message)
    } catch(err) {
        console.log(`Email error: ${err}`)
    }
}