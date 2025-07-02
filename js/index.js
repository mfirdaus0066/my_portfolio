let lightmode = localStorage.getItem('lightmode')//to store the preferred theme in the local storage (like in your browser)
const themeBtn = document.getElementById('themeBtn')

function enablelightmode()
{
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode','active')
}

function disablelightmode()
{
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode',null)
}

if(lightmode === "active")//to check if the light theme is active so it can be applied when you reload/comeback to the page
{
    enablelightmode()
}

themeBtn.onclick = function themechange()
{
    let lightmode = localStorage.getItem('lightmode')
    lightmode !== "active" ? enablelightmode() : disablelightmode()
}