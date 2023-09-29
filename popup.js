document.getElementById('toggle').addEventListener('click', function() {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // First, get the current status of the plugin
        browser.tabs.sendMessage(tabs[0].id, { action: "getPluginStatus" }, function(response) {
            if (response && response.isActive) {
                browser.tabs.sendMessage(tabs[0].id, { action: "deactivatePlugin" });
            } else {
                browser.tabs.sendMessage(tabs[0].id, { action: "activatePlugin" });
            }
        });
    });
});


function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
