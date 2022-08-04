setInterval(()=>{
    let month = new Date().getMonth()
    document.querySelector('.month').textContent = 11-month

    let days =  new Date().getDay()
    let lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    document.querySelector('.days').textContent = lastDay-days

    let hours = new Date().getHours()
    document.querySelector(".hours").textContent = 24 - hours

    let minutes = new Date().getMinutes()
    document.querySelector(".minutes").textContent = 60 - minutes

    let seconds = new Date().getSeconds()
    document.querySelector(".seconds").textContent = 60-seconds
}, 1000)



