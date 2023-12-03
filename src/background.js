/// <reference path="../node_modules/chrome-types/_all.d.ts"/>

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
async function onVisitedHandler(historyItem) {
  if (historyItem.url) {
    const { domains } = await chrome.storage.sync.get('domains');

    if (Array.isArray(domains)) {
      if (
        domains.find((domain) =>
          new RegExp(makeRegexFromDomain(domain)).test(historyItem.url),
        )
      ) {
        chrome.history.deleteUrl({ url: historyItem.url });
      }
    }
  }
}

chrome.history.onVisited.addListener(onVisitedHandler);
