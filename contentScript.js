const grabData = () => Array.from(document.getElementsByClassName('row')).map(row => ({
    id    : parseInt(row.querySelector('.topictitle').href.match(/&t=(\d+)/)[1]),
    title : row.querySelector('.topictitle').innerText,
    user  : row.querySelector('.username').innerText,
    date  : row.querySelector('[title="Go to last post"]').innerText,
    link  : row.querySelector('[title="Go to last post"]').href
}));

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        switch (message.type) {
            case 'getData':
                sendResponse(grabData());
                break;
            default:
                console.error('Unrecognised message: ', message);
        }
    }
);
