
let data = {

    title: "",
    season: "",
    episode: "",
    episodeName: "",
    action: ""

};

chrome.runtime.onInstalled.addListener(function() {

   console.log("Enabled Netflix RPC");

});


chrome.tabs.onUpdated.addListener(function(integer, object, Tab) {

    let url = Tab.url;
    console.log(url);
    let splittedUrl = url.split("/");

    if(url.toString().startsWith("chrome")) {
        return;
    }

    if(Tab.title === "Netflix") {
        console.log("Netflix");
        console.log(splittedUrl);
        let whatDoing = splittedUrl[3];
        console.log(whatDoing);


        if(whatDoing === "browse") {

            const browse = {
                "action": "browse"
            };

            const socket = new WebSocket("ws://127.0.0.1:6673/");
            socket.onopen = function(event){
            socket.send(JSON.stringify(browse))
                };
        }
        if (whatDoing === "watch") {

            const watch = {
                "action": "watch",
                "title": data.title,
                "season": data.season,
                "episode": data.episode,
                "episodeName": data.episodeName
            };

            const socket = new WebSocket("ws://127.0.0.1:6673/");
                socket.onopen = function(event) {
                    socket.send(JSON.stringify(watch))
                };

        }

    } else {
        return;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (typeof request.type !== "string") {

        return;

    } else {


        switch (request.type) {

            case "send_data":
                data.title = request["series"];
                data.season = request["season"];
                data.episodeName = request["episodeName"];
                data.episode = request["episode"];
                break;

        }

    }
    
});