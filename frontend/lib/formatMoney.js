export default function formatMoney(amt = 0) {
    const options = {
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 2,
    }
    // Check if it's a clean dollar amount 
    if (amt % 100 === 0) {
        options.minimumFractionDigits = 0; 
    }
    const formatter = Intl.NumberFormat('en-US', options)

    return formatter.format(amt / 100)
}