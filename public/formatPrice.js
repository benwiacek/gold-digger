export function formatPrice(number) {

    const options = { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    return number.toLocaleString('en-US', options)

}