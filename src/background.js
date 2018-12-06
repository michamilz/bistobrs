browser.runtime.onInstalled.addListener(function() {

    browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        var url = new URL(tab.url);
        var hostname = url.hostname;
        var urlParams = new URLSearchParams(url.search);

        // tabContentHasSelector(tabId, 'cssSelector');

        //browser.pageAction.hide(tabId);
        
        if (changeInfo.status === 'complete' 
            && hostname == 'bis.schwerin.de' && urlParams.has('__ksinr')) {
            browser.pageAction.show(tabId);
            browser.pageAction.setTitle({
                tabId: tabId,
                title: "Sitzung im BRS zeigen"
            });
        }

        if (changeInfo.status === 'complete' 
            && hostname == 'bis.schwerin.de' && urlParams.has('__kvonr')) {
            browser.pageAction.show(tabId);
            browser.pageAction.setTitle({
                tabId: tabId,
                title: "Vorgang im BRS zeigen"
            });
        } 

        if (changeInfo.status === 'complete' && hostname == 'brs-schwerin.de') {
            browser.tabs.sendMessage(
                tabId, 
                {
                    action: "getBodyClass"
                })
            .then(response => {
                console.log(response);
                bodyClass = response.bodyClass;

                if (bodyClass == 'petition') {
                    browser.pageAction.show(tabId);
                    browser.pageAction.setTitle({
                        tabId: tabId,
                        title: "Vorgang im BIS zeigen"
                    });
                }

                if (bodyClass == 'session') {
                    browser.pageAction.show(tabId);
                    browser.pageAction.setTitle({
                        tabId: tabId,
                        title: "Sitzung im BIS zeigen"
                    });
                }

                if (bodyClass.match(/filedetail/)) {
                    browser.pageAction.show(tabId);
                    browser.pageAction.setTitle({
                        tabId: tabId,
                        title: "Vorgang im BIS zeigen"
                    });
                }
            }).catch(onError);
        }  
    });
});

browser.pageAction.onClicked.addListener((tab) => {
    console.log('clicked');
    browser.tabs.query({active: true, currentWindow: true}, function(tabs){
        browser.tabs.sendMessage(tabs[0].id, {action: "switchToOtherWebsite"}).then(response => {
            browser.tabs.create({
                url: response.url
            });
        }).catch(onError);  
    });
});

function onError(error) {
    console.error(`Error: ${error}`);
}

async function shownInActiveTab() {
  let tabs = await browser.tabs.query({
    currentWindow:true,
    active: true
  });
  let shown = await browser.pageAction.isShown({
    tabId: tabs[0].id
  });
  console.log(shown);
}