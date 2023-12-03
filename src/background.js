/// <reference path="../node_modules/chrome-types/_all.d.ts"/>

const domains = ['www.yahoo.com', 'slashdot.org'];

function makeRegexFromDomain(domain) {
  // remove www if it exists
  let parsed = domain.replace(/^www\./, '');

  // add on optional www
  parsed = `(www.)?${parsed}`;

  // add optional http(s)
  parsed = `http(s)?://${parsed}`;

  // add optional anything trailing
  parsed += '/.*';

  // add modifiers
  parsed = `^${parsed}$`;

  return parsed;
}

/**
 * @param {chrome.history.HistoryItem} historyItem
 */
function onVisitedHandler(historyItem) {
  if (historyItem.url) {
    if (
      domains.find((domain) =>
        new RegExp(makeRegexFromDomain(domain)).test(historyItem.url),
      )
    ) {
      chrome.history.deleteUrl({ url: historyItem.url });
    }
  }
}

chrome.history.onVisited.addListener(onVisitedHandler);
