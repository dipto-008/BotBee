const express = require('express');
const { spawn } = require('child_process');
const app = express();
const colors = require('colors')
const port = 3000;
let botProcess;
const config = require('./config.json');
const User = require("./database/users");
const Thread = require("./database/threads");

let users = [];
let threads = [];
/*
async function loadUsersAndThreads() {
    try {
       const users2 = await User.getAll();
        const threads2 = await Thread.getAll();
        users.push(...users2.map(i => i.userId))
    threads.push(...threads2.map(i => i.threadId))
        
        console.log("Users and threads data loaded.".green);
    } catch (error) {
        console.error('Error loading users and threads:', error);
    }
}
*/


async function onBot() {
    botProcess = spawn('node', ['main.js'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
    });

    botProcess.on('close', (code) => {
        if (code === 2) {
            console.log('Restarting BotBee...'.red);
            onBot();
        } else if (code !== 0) {
            console.error(`Bot process exited with code ${code}`);
        }
    });
}

onBot();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
   // loadUsersAndThreads();
});


app.get('/dashboard-data', async (req, res) => {
    try {
    
        const uptime = process.uptime();
        const dashboardData ={
            botName: config.botName,
            prefix: config.prefix,
            adminName: config.adminName,
            totalUsers: users,
            totalThreads:threads,
            uptime
        }
        res.json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`.cyan);
});
