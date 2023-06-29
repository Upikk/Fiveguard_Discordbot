const fs = require("fs");
const path = require("path");

async function loadFiles(dirName) {
  const directoryPath = path.join(process.cwd(), dirName);
  const files = await getFiles(directoryPath);

  files.forEach((file) => delete require.cache[require.resolve(file)]);

  return files;
}

function getFiles(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const filePaths = [];

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          getFiles(filePath)
            .then((subDirFiles) => {
              filePaths.push(...subDirFiles);

              if (filePaths.length === files.length) {
                resolve(filePaths);
              }
            })
            .catch(reject);
        } else if (path.extname(file) === ".js") {
          filePaths.push(filePath);

          if (filePaths.length === files.length) {
            resolve(filePaths);
          }
        }
      });
    });
  });
}

module.exports = { loadFiles };
