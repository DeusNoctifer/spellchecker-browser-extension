chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkSpelling") {

    const apiUrl = 'https://api.languagetool.org/v2/check';
    const params = new URLSearchParams({
      text: request.text,
      language: 'en-US'
    });

    fetch(apiUrl, {
      method: 'POST',
      body: params
    })
    .then(response => response.json())
    .then(data => sendResponse({ result: data }))
    .catch(error => sendResponse({ error: "Error de API" }));
    
    return true; 
  }
});