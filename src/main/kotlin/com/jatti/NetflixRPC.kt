package com.jatti

import com.google.gson.Gson
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.application.*
import io.ktor.routing.Routing
import io.ktor.websocket.*
import java.time.Duration

fun main(args: Array<String>) {
    embeddedServer(Netty, 6673) {
        install(WebSockets) {
            pingPeriod = Duration.ofSeconds(200)
        }
        install(Routing) {
            webSocket("/") {
               val frame = incoming.receive()

                when(frame) {
                    is Frame.Text -> {
                        val text = frame.readText()
                        val gson = Gson()
                        val jsonData = gson.fromJson(text, Data::class.java)

                        if(DiscordRPCConnection.thread == null) {
                            DiscordRPCConnection(jsonData)
                        } else {
                            Commands().changeRPC(jsonData)
                        }

                    }
                }
            }

        }
    }.start(true)
}