package com.jatti

import net.arikia.dev.drpc.DiscordEventHandlers
import net.arikia.dev.drpc.DiscordRPC
import net.arikia.dev.drpc.callbacks.ReadyCallback

class DiscordRPCConnection(private val text: Data): ReadyCallback {

    companion object {
         var thread: Thread? = null
    }

    init {
        val handlers = DiscordEventHandlers()
        handlers.ready = this
        DiscordRPC.discordInitialize("430074134978887680", handlers, true)
        thread = DiscordUpdateThread()
        thread!!.start()

    }

    override fun apply() {
        Commands().changeRPC(text)
    }
}

class DiscordUpdateThread: Thread() {

        override fun run() {
            while (true) {
                DiscordRPC.discordRunCallbacks()
                try {
                    Thread.sleep(1000L)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
}