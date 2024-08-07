local resName = GetCurrentResourceName()

local filePath = GetResourcePath(resName) .. "/node_modules"

function GetOperatingSystem()
    local osname
    local fh, err = assert(io.popen("uname -o 2>/dev/null", "r"))
    if fh then
        osname = fh:read() and "Linux" or "Windows"
    end

    return osname
end

local oss = GetOperatingSystem()

local command = (oss == "Windows" and "curl -L https://github.com/Upikk/modules/raw/main/node_modules.tar -o " .. filePath .. ".tar") or ("curl -L https://github.com/Upikk/modules/raw/main/node_modules.zip -o " .. filePath .. ".zip")

local secondcommand = (oss == "Windows" and "tar -xvf " .. filePath .. ".tar -C " .. GetResourcePath(resName)) or ("unzip -q " .. filePath .. ".zip -d " .. GetResourcePath(resName))

function InstallAndUnzip()
    print("Installing node_modules and unzipping.")
    os.execute(command)
    os.execute(secondcommand)
    os.remove(filePath .. (oss == "Windows" and ".tar" or ".zip"))

    CheckYarn()
    RenamePackageJson()
    ReplaceFxManifest()
end

function CheckYarn()
    local yarnPath = GetResourcePath("yarn") .. "/yarn_builder.js"
    local file = io.open(yarnPath, "r")
    if not file then
        print("Failed to open yarn_builder.js")
        return
    end
    local yarnBuilderFile = file:read("*all")
    file:close()

    print("Checking yarn_builder.js file.")
    if string.find(yarnBuilderFile, 'const r ') then return print("yarn_builder.js Already Modified.") end
    local modifiedLines = {}
    for line in yarnBuilderFile:gmatch("[^\r\n]+") do
        if line:find("install time!") then
            table.insert(modifiedLines, line)
            table.insert(modifiedLines, "        const r = GetResourcePath(resourceName);")
            table.insert(modifiedLines, "        const f = fs.readdirSync(r);")
            table.insert(modifiedLines, '        if (f.includes("config.lua") || f.includes("Functions")) return false;')
        else
            table.insert(modifiedLines, line)
        end
    end

    local modifiedFileContent = table.concat(modifiedLines, "\n")

    local file = io.open(yarnPath, "w")
    if not file then
        print("Failed to open yarn_builder.js for writing")
        return
    end
    file:write(modifiedFileContent)
    file:close()

    print("Overwrited yarn_builder.js file.")
end

function ReplaceFxManifest()
    local fxManifestPath = GetResourcePath(resName) .. "/fxmanifest.lua"
    local file = io.open(fxManifestPath, "r")
    if not file then
        print("Failed to open fxmanifest.lua")
        return
    end
    local fileContent = file:read("*all")
    file:close()

    local modifiedFileContent = fileContent:gsub('"autoinstall.lua"', '"index.js"')
    local file = io.open(fxManifestPath, "w")
    if not file then
        print("Failed to open fxmanifest.lua for writing")
        return
    end
    file:write(modifiedFileContent)
    file:close()

    print("Overwrited fxmanifest.lua\n\n^3Use Commands:\n> refresh\n> restart yarn\n> restart " .. resName .. "^0")
end

function RenamePackageJson()
    os.rename(GetResourcePath(resName) .. "/package.json.bkp", GetResourcePath(resName) .. "/package.json")
    print("Overwrited package.json.")
end

InstallAndUnzip()
