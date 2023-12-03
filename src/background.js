const patterns = [
    'https://yahoo.com',
    'https://slashdot.org',
];

function onVisitedHandler(historyItem) {
    console.log('history item', historyItem);
}

chrome.history.onVisited.addListener(onVisitedHandler);
