RegisterNetEvent("FG_DiscordBot:revive", function(id)
    if source ~= "" then return end
    TriggerClientEvent("esx_ambulancejob:revive", id)
end)
