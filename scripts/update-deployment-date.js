// Node script to update the deployment date in the app_info.ts file
// Usage: node scripts\update-deployment-date.js

const fs = require('fs');
const path = require('path');

// Find the app_info.ts file in src/app/data/
const appInfoPath = path.join(__dirname, '../src/app/data/app_info.ts');
// Read the file and get lines of text
const appInfoFile = fs.readFileSync(appInfoPath, 'utf8');
const appInfoFileLines = appInfoFile.split('\n');
// Find the line containing: export const APP_DEPLOYMENT = 'ARBITRARY DATE STRING';
// Using regular expressions
const appInfoFileLine = appInfoFileLines.find(line => line.match(/export const APP_DEPLOYMENT =/));
// Replace the date string with the current date
// const appInfoFileLineUpdated = appInfoFileLine.replace(/'.*'/, `'${new Date().toISOString()}'`);
// Replace the date string with the current date in format MM-DD-YYYY HH:MM:SS AM/PM (CST)
const appInfoFileLineUpdated = appInfoFileLine.replace(/'.*'/, `'${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (CST)'`);
// Replace the line in the file
const appInfoFileUpdated = appInfoFile.replace(appInfoFileLine, appInfoFileLineUpdated);
// Write the file
fs.writeFileSync(appInfoPath, appInfoFileUpdated);