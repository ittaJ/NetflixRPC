const timer = setInterval(function () {

    if (document.getElementsByClassName("ellipsize-text") === null
        || document.getElementsByClassName("ellipsize-text")[0] === null) {
        return;

    } else {

        if (document.getElementsByClassName("ellipsize-text")[0].getElementsByTagName("h4")[0] === undefined) {
            const movieTitle = document.getElementsByClassName("ellipsize-text")[0].textContent;

            chrome.runtime.sendMessage({
                type: "send_movie_data",
                "movieTitle": movieTitle
            });
            clearInterval(timer)
        } else {

            const seriesTitle = document.getElementsByClassName("ellipsize-text")[0].getElementsByTagName("h4")[0].textContent;
            const episodeName = document.getElementsByClassName("ellipsize-text")[0].getElementsByTagName("span")[1].textContent;
            const season = document.getElementsByClassName("ellipsize-text")[0].getElementsByTagName("span")[0].textContent.split(':')[0];
            const episode = document.getElementsByClassName("ellipsize-text")[0].getElementsByTagName("span")[0].textContent.split(':')[1];

            chrome.runtime.sendMessage({
                type: "send_series_data",
                "series": seriesTitle,
                "episodeName": episodeName,
                "season": season,
                "episode": episode
            });
            clearInterval(timer)
        }
    }

}, 5000);
