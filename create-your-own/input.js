/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

// global variables
let workspace = document.querySelector("#workspace")
let targets = document.querySelectorAll(".target")
let canSelect = true
let selectedTarget = null
let draggedTarget = null
let dblclickDrag = false
let draggedTargetOriginalPosition = {
    top: "0px",
    left: "0px",
}


// function setup
function selectTarget(event) {
    event.stopPropagation()
    // console.log("canSelect: ", canSelect)
    if (!canSelect) {
        canSelect = true
        return
    }
    if (event.target.matches(".target")) {
        if (selectedTarget)
            selectedTarget.style.backgroundColor = 'red'
        selectedTarget = event.target
        selectedTarget.style.backgroundColor = 'blue'
    }
    else if (event.target.matches("#workspace")) {
        if (selectedTarget) {
            selectedTarget.style.backgroundColor = 'red';
            selectedTarget = null;
        }
    }
}

function initDraggedTarget(event) {
    draggedTarget = event.target
    draggedTargetOriginalPosition.top = event.target.style.top
    draggedTargetOriginalPosition.left = event.target.style.left
}

function clearDraggedTarget(event) {
    draggedTarget = null
    draggedTargetOriginalPosition.top = "0px"
    draggedTargetOriginalPosition.left = "0px"
}

function drag(event) {
    if (draggedTarget) {
        canSelect = false
        let { x, y } = draggedTarget.getBoundingClientRect()
        draggedTarget.style.left = (x + event.movementX) + "px"
        draggedTarget.style.top = (y + event.movementY) + "px"
    }
}

// target event listener
targets.forEach((target) => {
    target.addEventListener('click', selectTarget)
    target.addEventListener('mousedown', initDraggedTarget)
    target.addEventListener('dblclick', initDraggedTarget)
})

// workspace event listener
workspace.addEventListener('click', selectTarget)
workspace.addEventListener('mouseup', clearDraggedTarget)
workspace.addEventListener('mousemove', drag)
workspace.setAttribute("tabindex", -1); // enable getting the keyboard focus: https://stackoverflow.com/questions/18928116/javascript-keydown-event-listener-is-not-working
workspace.focus(); // give it the focus to start: https://stackoverflow.com/questions/6754275/set-keyboard-focus-to-a-div/6809236
workspace.addEventListener('keydown', (event) => {
    if (event.key == 'Escape' && draggedTarget) {
        draggedTarget.style.left = draggedTargetOriginalPosition.left
        draggedTarget.style.top = draggedTargetOriginalPosition.top
        clearDraggedTarget(event)
    }
})


// debug: document event listener
for (let i = 0; i < targets.length; i++) {
    targets[i].id = `t${i}`
}

document.addEventListener(
    'click',
    (event) => { console.log(event) },
    { capture: true }
)

document.addEventListener(
    'keydown',
    (event) => { console.log(event) },
    { capture: true }
)
