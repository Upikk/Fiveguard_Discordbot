const fs = require("fs");

const resName = GetCurrentResourceName();

const { exec } = require("child_process");

const filePath = `${GetResourcePath(resName)}/node_modules`;

const OS = process.platform;

const command =
  OS == "win32"
    ? `curl -L https://github.com/Upikk/modules/raw/main/node_modules.tar -o ${filePath}.tar`
    : `curl -L https://github.com/Upikk/modules/raw/main/node_modules.zip -o ${filePath}.zip`;

const secondcommand =
  OS == "win32"
    ? `tar -xvf ${filePath}.tar -C ${GetResourcePath(resName)}`
    : `unzip -q ${filePath}.zip -d ${GetResourcePath(resName)}`;

function InstallAnUnzipModules() {
  exec(command, (error) => {
    print("Installing node_modules.");
    if (error) {
      return console.log(
        `(If you need help dm me on discord: upik_)\n\n${error}`
      );
    }
    exec(secondcommand, (error) => {
      console.log("Unzipping node_modules.");
      if (error) {
        return console.log(
          `(If you need help dm me on discord: upik_)\n${error}`
        );
      }
      fs.unlinkSync(OS == "win32" ? `${filePath}.tar` : `${filePath}.zip`);
      console.log("Overwritng fxmanifest.lua");
      const ManifestPath = `${GetResourcePath(resName)}/fxmanifest.lua`;
      const ManifestFile = fs.readFileSync(ManifestPath, {
        encoding: "utf8",
      });
      const newManifestFile = ManifestFile.replace(
        `"autoinstall.js"`,
        `"index.js"`
      );
      fs.writeFileSync(ManifestPath, newManifestFile);
      console.log(
        `All Done!\n\n^3Use Commands:\n> refresh\n> restart ${resName}^0`
      );
    });
  });
}

InstallAnUnzipModules();
