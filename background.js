chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // Sitzungen
                // bis: ?__ksinr=6095
                // brs: /sitzung/6095
                // Vorgang
                // bis: ?__kvonr=6119
                // brs: /vorgang/6119
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { 
                            hostEquals: 'bis.schwerin.de',
                            queryContains: '__ksinr' 
                        },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { 
                            hostEquals: 'bis.schwerin.de',
                            queryContains: '__kvonr' 
                        },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { 
                            hostEquals: 'brs-schwerin.de'
                        },
                        css: [
                            "body.petition"
                        ]
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { 
                            hostEquals: 'brs-schwerin.de'
                        },
                        css: [
                            "body.session"
                        ]
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { 
                            hostEquals: 'brs-schwerin.de'
                        },
                        css: [
                            "body.filedetail"
                        ]
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "switchToOtherWebsite"}, function(response) {
            chrome.tabs.create({
                url: response.url
              });
        });  
    });
});