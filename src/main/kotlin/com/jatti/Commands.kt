package com.jatti

import net.arikia.dev.drpc.DiscordRPC
import net.arikia.dev.drpc.DiscordRichPresence

class Commands {

    fun changeRPC(data: Data) {
        DiscordRPC.discordClearPresence()
        val rpc = DiscordRichPresence()
        rpc.largeImageKey = "netflix_logo"

        if (data.action == "watch") {

            when (data.what) {

                "series" -> {
                    rpc.details = data.title
                    rpc.largeImageText = "${data.season}:${data.episode}"
                    rpc.state = data.episodeName
                }

                "movie" -> {
                    rpc.details = "Watching"
                    rpc.state = data.title
                }

            }

        }

        if (data.action == "browse") {
            rpc.details = "Browsing"
            when (data.what) {

                "home" -> {
                    rpc.state = "In Home"
                }

                "mylist" -> {
                    rpc.state = "In My List"
                }

                "kids" -> {
                    rpc.state = "In Kids"
                }

            }

        }

        DiscordRPC.discordUpdatePresence(rpc)
    }

}