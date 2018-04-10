package com.jatti

class Data {

    var action: String? = null
    var title: String? = null
    var season: String? = null
    var episode: String? = null
    var episodeName: String? = null


    constructor()

    constructor(action: String, title: String, season: String, episode: String, episodeName: String): super() {
        this.action = action
        this.title = title
        this.season = season
        this.episode = episode
        this.episodeName = episodeName
    }

    constructor(action: String): super() {
        this.action = action
    }
}