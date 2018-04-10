package com.jatti

import net.arikia.dev.drpc.DiscordRPC
import net.arikia.dev.drpc.DiscordRichPresence

class Commands {

    fun changeRPC(data: Data) {
        val rpc = DiscordRichPresence()
        rpc.largeImageKey = "netflix_logo"
        if (data.action == "watch") {
            rpc.details = data.title
            rpc.largeImageText = "${data.season}:${data.episode}"
            rpc.state = "${data.episodeName}"
        } else {
            rpc.details = data.action
        }
        DiscordRPC.discordUpdatePresence(rpc)
    }

}