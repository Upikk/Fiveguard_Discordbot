fx_version 'adamant'
games { "gta5" }
author "Upikk"
description "Discord Bot with Slash Commands to work with FiveGuard Systems."
lua54 'yes'

client_script "Fivem/client.lua"

server_scripts {
    "index.js",
    "Fivem/server.lua"
}
