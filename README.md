![image](https://github.com/user-attachments/assets/f77eb829-e17f-4d8d-a78f-14ca9643b276)Hello, i made discord bot with slash commands to work with FiveGuard Ban / Unban / Baninfo / Kick functions, i've also added fivem server status and /revive command

<b>If you'd like to buy custom bot (with commands that you want) you can dm me on discord: upik_</b>

# Requirements
- [yarn](https://2897568640-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FwNoQfmSrfSutIixeLn4V%2Fuploads%2FQiHYaJ71rKgXzDEiSwo9%2Fyarn.rar?alt=media&token=e0126714-6f4c-4def-a72e-3fad49e611ba) replaced innit (default path: resources/[cfx-default]/[system]/[builders]/yarn)

# config.json:

- Bot Token (token from discord.com/developers/applications)
- FiveGuard resource
- Server Status (shows your current player count in the bot Activity)
- Discord Permissions (You need to configure which role will have access to the Command)
- Translation
- Fiveguard Permissions (if you want to use Discord Roles with Fiveguard Permissions)
- Revive Command (remember to change your revive trigger in Fivem/server.lua file)

# Configuration

1. Go to https://discord.com/developers/applications and get your bot Token
2. Put your token in config.json
3. Add <b>ensure Fiveguard_Discordbot</b> to your server.cfg
4. Done!

if you want to use in game permissions, put your discord role id here:

![image](https://github.com/Upikk/Fiveguard_Discordbot/assets/96323919/024d6e3c-806c-43c4-8b03-2386714682a7)

if you want to add another role that has (for example) only access to : BypassNoclip, BypassThermalVision, BypassOCR, BypassNuiDevtools do this:

![image](https://github.com/Upikk/Fiveguard_Discordbot/assets/96323919/2c81513f-e593-47b5-a760-819db1fff203)
