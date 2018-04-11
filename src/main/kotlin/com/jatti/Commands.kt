package com.jatti

import net.arikia.dev.drpc.DiscordRPC
import net.arikia.dev.drpc.DiscordRichPresence

class Commands {

    fun changeRPC(data: Data) {
        val rpc = DiscordRichPresence()
        rpc.largeImageKey = "netflix_logo"
        if (data.action == "watch") {
            if (data.season != "") {
                rpc.details = data.title
                rpc.largeImageText = "${data.season}:${data.episode}"
                rpc.state = data.episodeName
            } else {
                rpc.details = "Watching"
                rpc.state = data.title
            }
        } else {
            rpc.details = "Browsing"
            if (data.browseWhat.isNullOrEmpty()) {
                rpc.state = "In Home"
            } else if (data.browseWhat!! == "mylist") {
                rpc.state = "In My List"
            }
        }
        DiscordRPC.discordUpdatePresence(rpc)
    }

}