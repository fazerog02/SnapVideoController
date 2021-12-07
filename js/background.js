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
                        for(let i = 0; i < tabs.length; i++){
                            if(tabs[i].id === tabId){
                                chrome.tabs.executeScript(tabs[i].id, {
                                    code: "startRecognizingWithInit();"
                                });
                            }else {
                                chrome.tabs.executeScript(tabs[i].id, {
                                    code: "stopRecognizing();"
                                });
                            }
                        }
                    }
                );
            }
        }
    }
);
