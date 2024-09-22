// update.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const backupDir = './backup';

// Helper function to ensure the existence of directories
function ensureDirectoryExistence(filePath) {
  const dirName = path.dirname(filePath);
  if (fs.existsSync(dirName)) return true;
  ensureDirectoryExistence(dirName);
  fs.mkdirSync(dirName);
}

// Backup file before updating
function backupFile(filePath) {
  const backupPath = path.join(backupDir, filePath);
  ensureDirectoryExistence(backupPath);
  fs.copyFileSync(filePath, backupPath);
  console.log(`Backed up: ${filePath} to ${backupPath}`);
}

// Function to update changed files
async function updateFiles() {
  try {
    // Read the update log to get the list of changed files
    const updateLog = fs.readFileSync('./update.log', 'utf-8');
    const changedFiles = updateLog
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => {
        const [file, status] = line.replace('- ', '').split(' (');
        return { file, status: status.replace(')', '') };
      });

    // Download and update the changed files
    for (const { file } of changedFiles) {
      const localPath = path.join(__dirname, file);

      // Backup the current file before updating
      if (fs.existsSync(localPath)) {
        backupFile(localPath);
      }

      // Fetch the raw URL of the file from GitHub
      const rawUrl = `https://raw.githubusercontent.com/Diptogittt/telegram-bot/main/${file}`;
      const response = await axios.get(rawUrl, { responseType: 'arraybuffer' });

      // Check if the data is a buffer (binary) or an object (like JSON)
      const dataToWrite = Buffer.isBuffer(response.data)
        ? response.data // Write binary data directly
        : typeof response.data === 'object'
        ? JSON.stringify(response.data, null, 2) // Convert object data to a formatted JSON string
        : response.data; // Write text data directly if it's already a string

      // Write the fetched data to the local path
      fs.writeFileSync(localPath, dataToWrite);
      console.log(`Updated: ${localPath}`);
    }
  } catch (error) {
    console.error('Error during file update:', error.message);
  }
}

// Run the file update when this script is executed
updateFiles();
