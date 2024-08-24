local res = GetCurrentResourceName()

ExecuteCommand("add_ace group.PermissionsBypass command allow");

ExecuteCommand("add_principal resource." .. res .. " group.PermissionsBypass");

local jsonFile = LoadResourceFile(GetCurrentResourceName(), 'config.json')
local jsonified = json.decode(jsonFile)

for k, permissionObject in pairs(jsonified.IN_GAME_PERMISSIONS.PERMISSIONS) do
    for i, j in pairs(permissionObject) do
        ExecuteCommand("add_ace group.superPermissions " .. permissionValue .. " allow")
    end
end

RegisterNetEvent("FG_DiscordBot:revive", function(id)
    print("reviving player with id:", id)
    if source ~= "" then return end
    TriggerClientEvent("esx_ambulancejob:revive", id)
end)
