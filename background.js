chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions : [new chrome.declarativeContent.PageStateMatcher({
                pageUrl : {
                    hostEquals    : 'www.bryntum.com',
                    queryContains : 'search_id=active_topics'
                }
            })],
            actions    : [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    // chrome.pageAction.setBadgeText({ text : '0' });
    // chrome.pageAction.setBadgeBackgroundColor({ color : 'green' });
});

