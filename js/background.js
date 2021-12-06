chrome.tabs.onActivated.addListener(
    (activeInfo) => {
        chrome.tabs.getAllInWindow(
            null,
            (tabs) => {
                tabs.forEach(tab => {
                    if(tab.id == activeInfo.tabId) {
                        chrome.tabs.executeScript(tab.id, {
                            code: "startRecognizing();"
                        });
                    }else {
                        chrome.tabs.executeScript(tab.id, {
                            code: "stopRecognizing();"
                        });
                    }
                });
            }
        );
    }
);


chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if(changeInfo.status !== undefined) {
            if(changeInfo.status === "complete") {
                chrome.tabs.getAllInWindow(
                    null,
                    (tabs) => {
                        if(tabs.length <= 1){
                            chrome.tabs.executeScript(tabId, {
                                code: "startRecognizingWithInit();"
                            });
                        }else {
                            chrome.tabs.executeScript(tabId, {
                                code: "init();"
                            });
                        }
                    }
                );
            }
        }
    }
);
