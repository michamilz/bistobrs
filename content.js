(function(){
    "use strict";
    
    chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
        console.log(message);
        switch (message.action) {
            case "switchToOtherWebsite":
                var currentUrl = window.location.href;
                if( currentUrl.match(/brs-schwerin/gi) ) {
                    var prev = document.querySelector("link[rel='prev']");
                    if (prev !== null){
                        var brsUrl = prev.href;
                    } else {
                        var brsUrl = document.querySelector("link[rel='shortlink']").href;
                    }
                    var matches = brsUrl.match(/(\w*)\/(\d*)$/);
                    if( matches[1] == 'vorgang') {
                        var returnUrl = "https://bis.schwerin.de/vo0050.asp?__kvonr=" + matches[2];
                    }
                    if( matches[1] == 'sitzung') {
                        var returnUrl = "https://bis.schwerin.de/to0040.asp?__ksinr=" + matches[2];
                    }
                }

                if( currentUrl.match(/bis\.schwerin/gi) ) {
                    var matches = currentUrl.match(/__k(si|vo)nr=(\d*)/);
                    if( matches[1] == 'vo') {
                        var returnUrl = "https://brs-schwerin.de/vorgang/" + matches[2];
                    }
                    if( matches[1] == 'si') {
                        var returnUrl = "https://brs-schwerin.de/sitzung/" + matches[2];
                    }
                }
                sendResponse({url: returnUrl});
                break;
        }
    });
})();
