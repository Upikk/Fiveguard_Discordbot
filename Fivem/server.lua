local res = GetCurrentResourceName()

ExecuteCommand("add_ace group.PermissionsBypass command allow");

ExecuteCommand("add_principal resource." .. res .. " group.PermissionsBypass");

local jsonFile = LoadResourceFile(GetCurrentResourceName(), 'config.json')
local jsonified = json.decode(jsonFile)

for roleId, permissionObject in pairs(jsonified.IN_GAME_PERMISSIONS.PERMISSIONS) do
    for index, permissionValue in pairs(permissionObject) do
        ExecuteCommand("add_ace group." .. roleId .. " " .. permissionValue .. " allow")
    end
end

---@param license string
---@return string | nil
function GetIDByLicense(license)
    for index, id in pairs(GetPlayers()) do
        if GetPlayerIdentifierByType(id, "license") == license then
            return id
        end
    end
end

---@param targetId number
---@return nil
function revive(targetId)
    if GetResourceState('es_extended') == 'started' then 
        TriggerClientEvent("esx_ambulancejob:revive", targetId)
    elseif GetResourceState('qb_core') == 'started' then 
        TriggerClientEvent("hospital:client:Revive", targetId)
    else
         error('No supported framework founded (es_extended or qb_core)')
    end
end

RegisterNetEvent("FG_DiscordBot:revive", function(targetId)
    if source ~= "" then return end
        revive(targetId)
end)

RegisterNetEvent("FG_DiscordBot:BanPlayerLicense", function(license, reason)
    if source ~= "" then return end
    print("ban license", license)
    local id = GetIDByLicense(license)
    exports[jsonified.FIVEGUARD_RESOURCE_NAME]:fg_BanPlayer(id, "[AUTO-BAN] " .. reason, true)
end)

RegisterNetEvent("bot:spawnedTypeShit", function()
    if not jsonified.IN_GAME_PERMISSIONS.ENABLED then return end
    if jsonified.IN_GAME_PERMISSIONS.SHOW_LOADED_INFO then
        print("Refreshed permissions for ID: " .. source)
    end
    exports[jsonified.FIVEGUARD_RESOURCE_NAME]:RefreshPlayerPermissions(source)
end)
