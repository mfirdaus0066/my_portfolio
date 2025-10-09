let lightmode = localStorage.getItem('lightmode')//to store the preferred theme in the local storage (like in your browser)
const themeBtn = document.getElementById('themeBtn')
const fileIcon = document.getElementsByClassName('fileIcon')
const windowBox = document.getElementById('windowbox')
const closeBtn = document.getElementsByClassName('closebtn')
const miniBtn = document.getElementsByClassName('minibtn')
const shrinkBtn = document.getElementsByClassName('shrinkbtn')
const tabIconLight = document.getElementsByClassName('tabIcon-light')
const tabIconDark = document.getElementsByClassName('tabIcon-dark')

function enablelightmode()
{
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode','active')

    fileIcon[0].style.display = "none"
    fileIcon[1].style.display = "block"
    //just like the theme icon case but since the file icon is an image and not a colour i decide to do it this way
    closeBtn[0].style.display = "none"
    closeBtn[1].style.display = "block"

    shrinkBtn[0].style.display = "none"
    shrinkBtn[1].style.display = "block"

    miniBtn[0].style.display = "none"
    miniBtn[1].style.display = "block"

    for(let i=0; i< tabIconDark.length; i++)
    {
        tabIconDark.style.display = "none"
        tabIconLight.style.display = "block"
    }
}

function disablelightmode()
{
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode',null)

    fileIcon[1].style.display = "none"
    fileIcon[0].style.display = "block"

    closeBtn[1].style.display = "none"
    closeBtn[0].style.display = "block"

    shrinkBtn[1].style.display = "none"
    shrinkBtn[0].style.display = "block"

    miniBtn[1].style.display = "none"
    miniBtn[0].style.display = "block"

    for(let i=0; i< tabIconDark.length; i++)
    {
        tabIconDark.style.display = "block"
        tabIconLight.style.display = "none"
    }
   
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
    windowBox.style.visibility = "visible"
    windowBox.style.left = "50%"
    windowBox.style.top = "50%"
    windowBox.style.transform = "translate(-50%, -50%) scale(1)"
    content.style.display = "block"
    windowBox.style.position = "fixed"
}

function closeWindow()
{
    windowBox.style.visibility = "hidden"
}

let windowloc = -96;
let isMinimize = false; //to ensure the window is minimize or not
const content = windowBox.querySelector('.window-content');
let isShrink = false;

function miniWindow()
{
    windowBox.style.transform = `translate(${windowloc}%, 8%) scale(0.35)`
    windowBox.style.transition = "transform 0.5s"
    windowBox.style.position = "absolute"
    isMinimize = true

    if(content)
    {
          content.style.display = "none" //queryselector is to select the id or class w/o using get...
    }
}

windowBox.addEventListener('click', maxWindowOnClick);//to maximize the window when clicked on it

function shrinkWindow()
{
    

    if(!isShrink)
    {   
        windowBox.style.transform =  "translate(-50%, -50%) scale(0.6)"
        windowBox.style.transistion = "transform 0.5s"
        isShrink = true;
    }

    else
    {
        windowBox.style.transform= "translate(-50%, -50%) scale(1)"// the translate -50% is to make it center
        windowBox.style.transistion = "transform 0.5s"
        isShrink = false;
    }

}

function maxWindowOnClick ()
{
    if(isMinimize)
    {
        windowBox.style.transform = "translate(-50%, -50%) scale(1)"
        windowBox.style.transition = "transform 0.5s"
        isMinimize = false
        windowBox.style.position = "fixed"

        if(content && isShrink)
        {
            content.style.display = "block"
            windowBox.style.transform =  "translate(-50%, -50%) scale(0.6)"
            windowBox.style.transistion = "transform 0.5s"
        }

        windowBox.removeEventListener('click', maxWindowOnClick);
    }
}

let isDragging = false
let newX, newY, startX, startY;

windowBox.addEventListener('mousedown', mouseDown)//to grab the window to drag

function mouseDown(e)
{
    if(isMinimize) return; //to prevent dragging when minimized
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);//to drag the window when the mouse is on the window
    document.addEventListener('mouseup', mouseUp);//to stop the dragging when the mouse is not on the window
}

function mouseMove(e)
{
    if(isDragging)
    {
        newX = startX - e.clientX;//to get the placement of the mouse
        newY = startY - e.clientY;

        startX = e.clientX;//to update the placement of the mouse like where it currently is
        startY = e.clientY;//e.client is the position of our mouse

        windowBox.style.left = (windowBox.offsetLeft - newX) + "px";//to move the window itself
        windowBox.style.top = (windowBox.offsetTop - newY) + "px";//offset is the  position of our element for this situation its the window
    }
}

function mouseUp(e)
{
    isDragging = false;
    if(!isDragging)
    document.removeEventListener('mousemove',mouseMove);
}

