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

RegisterNetEvent("FG_DiscordBot:revive", function(id)
    if source ~= "" then return end
    TriggerClientEvent("esx_ambulancejob:revive", id)
end)


function GetFiveguardResourceName()
    for i = 0, GetNumResources() - 1 do
        if LoadResourceFile(GetResourceByFindIndex(i), 'sv-resource-obfuscated.lua') then
            return GetResourceByFindIndex(i)
        end
    end
end

RegisterNetEvent("FG_DiscordBot:BanPlayerLicense", function(license)
    if source ~= "" then return end
    print("ban license", license)
    local id = GetIDByLicense(license)
    exports[jsonified.FIVEGUARD_RESOURCE_NAME]:fg_BanPlayer(id, "Aimbot Detected", true)
end)

function GetIDByLicense(license)
    for index, id in pairs(GetPlayers()) do
        if GetPlayerIdentifierByType(id, "license") == license then
            return id
        end
    end
end
