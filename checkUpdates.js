const fs = require('fs');
const path = require('path');
const axios = require('axios');

const repoOwner = 'dipto-008'; 
const repoName = 'Telegram-Bot-V1';
async function checkForUpdates() {
  try {
    const localPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const localVersion = localPackage.version;
    const repoPackageUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/package.json`;
    const repoPackage = await axios.get(repoPackageUrl).then(res => res.data);
    const repoVersion = repoPackage.version;

    if (localVersion !== repoVersion) {
      const commitData = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/main`);
      const commitMessage = commitData.data.commit.message;

      const commitSha = commitData.data.sha;
      const filesData = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${commitSha}`);
      const changedFiles = filesData.data.files.map(i => ({
        sha: i.sha,
        file: i.filename,
        status: i.status,
        url: i.raw_url,
      }));

      const updateLog = changedFiles.map(file => `- ${file.file} (${file.status})`).join('\n');
      fs.writeFileSync('./update.log', `Commit Message: ${commitMessage}\n\nChanged Files:\n${updateLog}`);
      console.log(`Update log written. Changes detected:\n${updateLog}`);
    } else {
      fs.writeFileSync('./update.log', 'You are using the latest version.');
      console.log('- You are using the latest version.');
    }
  } catch (error) {
    console.error('Error during update process:', error.message);
  }
}

checkForUpdates();