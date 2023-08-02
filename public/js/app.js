const infoEl = document.querySelector(".info")
const forecastEl = infoEl.querySelector(".forecast")
const locationEl = infoEl.querySelector(".location")
const errorEl = document.querySelector(".error")

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const address = e.target.children[0].value.trim()
    e.target.children[0].value = ""
    if (address.length === 0) {
        errorEl.innerText = "you need to enter a loction"
        errorEl.style.display = 'inline-block'
        return
    }
    errorEl.style.display = 'none'
    req(address)
})

const req = async (address) => {
    forecastEl.innerText = ""
    locationEl.innerText = ""
    // res = await fetch(`http://localhost:5000/weather?address=${address}`)
    res = await fetch(`https://tired-jade-chinchilla.cyclic.cloud/weather?address=${address}`)
    data = await res.json()
    if (data.error) {
        errorEl.innerText = "Error message: " + data.error
        errorEl.style.display = 'inline- block'
        return
    }
    forecastEl.innerText = data.forecast
    locationEl.innerText = data.location
}

