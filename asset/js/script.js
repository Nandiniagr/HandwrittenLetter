function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let element = document.getElementById(data).cloneNode(true);
    element.style.position = "absolute";
    element.style.left = (event.clientX - event.target.getBoundingClientRect().left) + "px";
    element.style.top = (event.clientY - event.target.getBoundingClientRect().top) + "px";
    element.removeAttribute("ondragstart");
    element.setAttribute("draggable", "true");
    element.setAttribute("ondragstart", "drag(event)");
    element.setAttribute("onclick", "deleteElement(this)");
    event.target.appendChild(element);
}

function openEnvelope() {
    document.getElementById("envelope").classList.add("open");
    setTimeout(() => {
        document.getElementById("envelope").style.display = "none";
        document.getElementById("letterContainer").style.display = "flex";
    }, 500);
}

function addTextBox() {
    let textBox = document.createElement("textarea");
    textBox.className = "text-box";
    textBox.style.left = "50px";
    textBox.style.top = "50px";
    textBox.setAttribute("onmousedown", "dragElement(this)");
    textBox.setAttribute("ondblclick", "deleteElement(this)");
    document.getElementById("letterCanvas").appendChild(textBox);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = function(event) {
        event.preventDefault();
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(event) {
        event.preventDefault();
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function deleteElement(elmnt) {
    elmnt.parentNode.removeChild(elmnt);
}
