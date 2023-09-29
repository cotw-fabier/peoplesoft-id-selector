let divAdded = false;
let isLocked = false;
let divElement;


function createDiv() {
    divElement = document.createElement('div');
    divElement.style.position = 'fixed';
    divElement.style.top = '0';
    divElement.style.left = '0';
    divElement.style.background = '#000';
    divElement.style.color = '#fff';
    divElement.style.padding = '5px';
    document.body.appendChild(divElement);
}

function updateDivValue(value) {
    divElement.innerText = 'Input ID: ' + value;
}

document.addEventListener('mouseover', function(event) {
    if (!divAdded || isLocked) return;
    let target = event.target;
    if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'label') {
        updateDivValue(target.id);
    }
});

document.addEventListener('click', function(event) {
    if (!divAdded) return;
    let target = event.target;
    if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'label') {
        isLocked = true;
    } else {
        isLocked = false;
    }
});

function activatePlugin() {
    if (!divAdded) {
        createDiv();
        divAdded = true;
    }
}

function deactivatePlugin() {
    if (divAdded) {
        divElement.remove();
        divAdded = false;
        isLocked = false;
    }
}

// Updated event listeners for messages
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "activatePlugin") {
        activatePlugin();
    } else if (request.action == "deactivatePlugin") {
        deactivatePlugin();
    } else if (request.action == "getCurrentId") {
        sendResponse({ currentId: divElement.innerText.replace('Input ID: ', '') });
    } else if (request.action == "getPluginStatus") {
        sendResponse({ isActive: divAdded });
    }
});


