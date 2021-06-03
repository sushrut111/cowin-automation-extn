!function(){
    chrome.webRequest.onBeforeRequest.addListener(
        function(_) {
            target = "data:application/json;base64,ewogICAgInN1Y2Nlc3MiOiB0cnVlCn0=";
            result =  {
                redirectUrl: target
            };
            return result;            
        }, 
        {
            urls: ["https://cdn-api.co-vin.in/api/v2/appointment/sessions/search*"]
        }, 
        ["blocking"]
    );
}();