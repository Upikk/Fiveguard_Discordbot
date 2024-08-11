local res = GetCurrentResourceName()

ExecuteCommand("add_ace group.PermissionsBypass command allow");

ExecuteCommand("add_principal resource." .. res .. " group.PermissionsBypass");

RegisterNetEvent("FG_DiscordBot:revive", function(id)
    if source ~= "" then return end
    TriggerClientEvent("esx_ambulancejob:revive", id)
end)
