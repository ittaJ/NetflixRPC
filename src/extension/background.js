let data = {

    type: "",
    title: "",
    season: "",
    episode: "",
    episodeName: ""

};

chrome.runtime.onInstalled.addListener(function () {

    console.log("Enabled Netflix RPC");

});


chrome.tabs.onUpdated.addListener(function (integer, object, Tab) {

    function sendData(toSend) {
        const socket = new WebSocket("ws://127.0.0.1:6673/");
        socket.onopen = function (event) {
            socket.send(JSON.stringify(toSend))
        }
    }

    let url = Tab.url;
    let splittedUrl = url.split("/");

    if (Tab.title === "Netflix") {

        let whatDoing = splittedUrl[3];

        if (whatDoing === "Kids") {

            const browseKids = {
                "action": "browse",
                "what": "kids"
            };

            sendData(browseKids);

        }

/**        if (whatDoing.startsWith("browse?")) {

            const browseTitle = {
                "action": "browse",
                "what": "title",
                "title": data.title
            };

            //sendData(browseTitle);
        }*/

        if (whatDoing === "browse") {

            if (splittedUrl[4] !== "" && splittedUrl[4] === "my-list") {

                const browseMyList = {
                    "action": "browse",
                    "what": "mylist"
                };

                sendData(browseMyList);

            } else {

                const browseHome = {
                    "action": "browse",
                    "what": "home"
                };

                sendData(browseHome);
            }
        }
        if (whatDoing === "watch") {

            switch (data.type) {


                case "series":
                    const watchSeries = {
                        "action": "watch",
                        "what": data.type,
                        "title": data.title,
                        "season": data.season,
                        "episode": data.episode,
                        "episodeName": data.episodeName
                    };

                    sendData(watchSeries);

                    data.title = "";
                    data.episode = "";
                    data.episodeName = "";
                    data.season = "";
                    data.type = "";
                    break;


                case "movie":
                    const watchMovie = {
                        "action": "watch",
                        "what": data.type,
                        "title": data.title
                    };

                    sendData(watchMovie);

                    data.title = "";
                    data.episode = "";
                    data.episodeName = "";
                    data.season = "";
                    data.type = "";
                    break;

            }
        }

    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (typeof request.type !== "string") {

        return;

    } else {


        switch (request.type) {

            case "send_series_data":

                data.type = "series";
                data.title = request["series"];
                data.season = request["season"];
                data.episodeName = request["episodeName"];
                data.episode = request["episode"];

                break;

            case "send_movie_data":

                data.type = "movie";
                data.title = request["movieTitle"];

                break;
        }

    }

});