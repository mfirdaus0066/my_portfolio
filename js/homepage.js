let lightmode = localStorage.getItem('lightmode')//to store the preferred theme in the local storage (like in your browser)
const themeBtn = document.getElementById('themeBtn')
const fileIcon = document.getElementsByClassName('fileIcon')
const windowBox = document.getElementById('windowbox')
const closeBtn = document.getElementsByClassName('closebtn')
const window = document.getElementById('window')

function enablelightmode()
{
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode','active')

    fileIcon[0].style.display = "none"
    fileIcon[1].style.display = "block"
    //just like the theme icon case but since the file icon is an image and not a colour i decide to do it this way
    closeBtn[0].style.display = "none"
    closeBtn[1].style.display = " block"
}

function disablelightmode()
{
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode',null)

    fileIcon[1].style.display = "none"
    fileIcon[0].style.display = "block"

    closeBtn[0].style.display = "none"
    closeBtn[1].style.display = " block"
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

function openFile()
{
    windowBox.style.visibility = "visible";
    windowBox.style.left = "50%";
    windowBox.style.top = "50%";
}

function closeWindow()
{
    windowBox.style.visibility = "hidden"
}

function miniWindow()
{
   
}

let isDragging = false
let newX, newY, startX, startY;

windowBox.addEventListener('mousedown', mouseDown)//to grab the window to drag

function mouseDown(e)
{
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    windowBox.addEventListener('mousemove', mouseMove);//to drag the window when the mouse is on the window
    windowBox.addEventListener('mouseup', mouseUp);//to stop the dragging when the mouse is not on the window
}

function mouseMove(e)
{
    if(isDragging)
    {
        newX = startX - e.clientX;//to get the placement of the mouse
        newY = startY - e.clientY;

        startX = e.clientX;//to update the placement of the mouse like where it currently is
        startY = e.clientY;

        windowBox.style.left = (windowBox.offsetLeft - newX) + "px";//to move the window itself
        windowBox.style.top = (windowBox.offsetTop - newY) + "px";
    }
}

function mouseUp(e)
{
    isDragging = false;
    if(!isDragging)
    document.removeEventListener('mousemove',mouseMove);
}

