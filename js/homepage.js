let lightmode = localStorage.getItem('lightmode')//to store the preferred theme in the local storage (like in your browser)
const themeBtn = document.getElementById('themeBtn')
const fileIcon = document.getElementsByClassName('fileIcon')
const windowBox = document.getElementById('windowbox')
const closeBtn = document.getElementsByClassName('closebtn')
const miniBtn = document.getElementsByClassName('minibtn')
const shrinkBtn = document.getElementsByClassName('shrinkbtn')
const tabIconLight = document.getElementsByClassName('tabIcon-light')
const tabIconDark = document.getElementsByClassName('tabIcon-dark')

let isMinimize = false; //to ensure the window is minimize or not
const content = windowBox.querySelector('.window-content');
let isShrink = false;

const dockPanel = { left: -123, top: 10}


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
        tabIconDark[i].style.display = "none"
        tabIconLight[i].style.display = "block"
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
        tabIconDark[i].style.display = "block"
        tabIconLight[i].style.display = "none"
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
    windowBox.style.cursor = "cursor"

    windowBox.addEventListener('mousedown', mouseDown);
    windowBox.removeEventListener('click', restoreOnClick)

    isMinimize = false
    isShrink = false
}

function closeWindow()
{
    windowBox.style.visibility = "hidden"

    isMinimize = false
    isShrink = false
}

function miniWindow()
{
    windowBox.style.transition = "transform 0.5s"
    windowBox.style.transform = `translate(${dockPanel.left}%, ${dockPanel.top}%) scale(0.35)`
    windowBox.style.position = "fixed"
    windowBox.style.pointerEvents = "auto"
    windowBox.style.zIndex = "100"
    windowBox.style.cursor = "pointer"

    content.style.display = "none" //queryselector is to select the id or class w/o using get...
    isMinimize = true;
    windowBox.removeEventListener('mousedown', mouseDown);


    const waitTransition = () =>
    {
        windowBox.addEventListener('click', restoreOnClick)
        windowBox.removeEventListener('transitionend', waitTransition)//to prevent multiple event listener being added
    }
        windowBox.addEventListener('transitionend', waitTransition)
}

function restoreOnClick(e)
{
    if(!isMinimize) return;
    
    maxWindowOnClick();//to maximize the window when clicked on it
    e.stopPropagation();//to prevent the click event from bubbling up to the parent element
    
    windowBox.removeEventListener('click', restoreOnClick);

}

function shrinkWindow()
{

    if(!isShrink)
    {   
        windowBox.style.transform =  "translate(-50%, -50%) scale(0.6)"
        windowBox.style.transition = "transform 0.5s"
        isShrink = true;
    }

    else
    {
        windowBox.style.transform= "translate(-50%, -50%) scale(1)"// the translate -50% is to make it center
        windowBox.style.transition = "transform 0.5s"
        isShrink = false;
    }

    windowBox.style.cursor = "cursor"
    windowBox.addEventListener('mousedown', mouseDown);

}

function maxWindowOnClick()
{
    console.log("clicked!")

        if(content)
        {
            content.style.display = "block"
        }

        if(isShrink)
        {
            windowBox.style.transform =  "translate(-50%, -50%) scale(0.6)"
            isShrink = true
        }

        else
        {
            windowBox.style.transform = "translate(-50%, -50%) scale(1)"
        }

        isMinimize = false

        windowBox.style.transition = "transform 0.5s"
        windowBox.style.position = "fixed"
        windowBox.style.cursor = "cursor"

        windowBox.addEventListener('mousedown', mouseDown);
};

let isDragging = false
let newX, newY, startX, startY;

windowBox.addEventListener('mousedown', mouseDown)//to grab the window to drag

function mouseDown(e)
{
    if(isMinimize) return; //to prevent dragging when minimized
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    windowBox.style.cursor = "grabbing"

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
    {
        windowBox.style.cursor = "grab"
        document.removeEventListener('mousemove',mouseMove);
    }
}