export function formatGoldAmount(number) {

    const options = { 
        maximumFractionDigits: 3
    }
 
    if(number < 32.1507 ) {
        return `${number.toLocaleString('en-US', options)} ounces (ozt)`
    } else if (number < 32150.7) {
        return `${(number / 32.1507).toLocaleString('en-US', options)} kg (${number.toLocaleString('en-US', options)} ozt)`
    } else {
        let result = `${(number / 32150.7).toLocaleString('en-US', options)} t (${number.toLocaleString('en-US', options)} ozt)`
        return result
    }
    
}