let lightmode = localStorage.getItem('lightmode')//to store the preferred theme in the local storage (like in your browser)
const themeBtn = document.getElementById('themeBtn')
const fileIcon = document.getElementsByClassName('fileIcon')

function enablelightmode()
{
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode','active')

    fileIcon[0].style.display = "none"
    fileIcon[1].style.display = "block"
    //just like the theme icon case but since the file icon is an image and not a colour i decide to do it this way
}

function disablelightmode()
{
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode',null)

    fileIcon[1].style.display = "none"
    fileIcon[0].style.display = "block"
}

if(lightmode === "active")//to check if the light theme is active so it can be applied when you reload/comeback to the page
{
    enablelightmode()
}

function themechange()
{
    let lightmode = localStorage.getItem('lightmode')
    lightmode !== "active" ? enablelightmode() : disablelightmode()
}