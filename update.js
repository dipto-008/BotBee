const fs = require('fs');
const path = require('path');
const axios = require('axios');

const backupDir = './backup';
function ensureDirectoryExistence(filePath) {
  const dirName = path.dirname(filePath);
  if (fs.existsSync(dirName)) return true;
  ensureDirectoryExistence(dirName);
  fs.mkdirSync(dirName);
}

function backupFile(filePath) {
  const backupPath = path.join(backupDir, filePath);
  ensureDirectoryExistence(backupPath);
  fs.copyFileSync(filePath, backupPath);
  console.log(`Backed up: ${filePath} to ${backupPath}`);
}
async function updateFiles() {
  try {
    const updateLog = fs.readFileSync('./update.log', 'utf-8');
    const changedFiles = updateLog
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => {
        const [file, status] = line.replace('- ', '').split(' (');
        return { file, status: status.replace(')', '') };
      });

    for (const { file } of changedFiles) {
      const localPath = path.join(__dirname, file);

      if (fs.existsSync(localPath)) {
        backupFile(localPath);
      }
      const rawUrl = `https://raw.githubusercontent.com/dipto-008/Telegram-Bot-V1/main/${file}`;
      const response = await axios.get(rawUrl, { responseType: 'arraybuffer' });

      const dataToWrite = Buffer.isBuffer(response.data)
        ? response.data : typeof response.data === 'object'? JSON.stringify(response.data, null, 2) : response.data; 
      fs.writeFileSync(localPath, dataToWrite);
      fs.unlinkSync("./update.log");
      console.log(`Updated: ${localPath}`);
    }
  } catch (error) {
    console.error('Error during file update:', error.message);
  }
}

updateFiles();