document.querySelector('a').addEventListener('click', e => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
});