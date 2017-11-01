chrome.webRequest.onHeadersReceived.addListener(
    setPDFMimeType,
    {urls: ["https://bis.schwerin.de/getfile.asp*"]},
    ["blocking", "responseHeaders"]
);

function setPDFMimeType(e) {
    var responseHeaders = e.responseHeaders.map(function(header){
        if (header.name == "Content-Disposition") {
            header.value = header.value.replace('attachment;', 'inline;');
        } 
        return header;
    });
    console.log(e);
    return {responseHeaders: responseHeaders};
}