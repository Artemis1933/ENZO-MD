const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9KNTJPNjlhTEFRaFNQTEhQUUFRVjZHVE42N0JYQ1VUblRDb2M4M3NtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieExNai8rY09vUUtrUlBxdlliZlhzMTkvZWxtQjVFdjIrOURnUmxoSjMxTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Szd1TzgrU01veGV5VmJCbmIyVHlFcVJXbGhSbkd6cm9RQjd4cEEyZG44PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmalk5Uk9OaXdXbWdSSnNKWkhnUWk1UW1xd1VOakdHYnRlODFYOHp6RFRFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1KemYwWmtNdmptVkR4b3ArYUlpczNsSGVhc0FnandqakNzRzhwR2lhRmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1UYXNuRXhtU3lvS0FGSGRyTkNQeFRLeU9mbzhGU0V2NVlNZGUzWHhSMTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEtES0toNVVMRVhDMFJRbnkzY3RSZlhwUjVrRURXejRuK0g0Z1hHdk9Wdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2U2ODN2aFBQY3A1VGhoczlHNS8xRklCb2c0RlNrazI5ek5oRzVDb1B5bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkEzRVNEY2tPck5HVVJuemhlbEhCSXBSNVVSTVQ0RFhRMzVWd0N4Z1ZMS0xuVGlkVGx4VzFieHUvMUlvOXNIUTM2dzhoZmg3RGhKeXJSNTRNSmlVZkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJ4OUt5ZVY3clhCcFVHMVo2U2toZ2RPbEVwNGVtdnBrVE5tTmQ4K3E1R0ZnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJZ21vTnJRR1NiR2VsZ2lIU3dBcl9RIiwicGhvbmVJZCI6Ijg0MGE1MDI3LTNmNTgtNDZmYy1hNGZjLTY2MjQ3NGJmNjc4OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvalZQU1dDQWFsRWIvcFFXYnpyMEw3NlUyeEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWZlRDNUUEcvQ0hLMlhpRU1jK3Y1b2RzbW4wPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNWUVBSOEhZIiwibWUiOnsiaWQiOiIyNTQ3OTk5MzkyNTI6MTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tTYmk4VUdFSkxSOHJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZOZi9pcUhxcC9WZ3c2NWlmRFp4L0pVQlZNZnFONWJsdFhUOFZ4UXpvUW89IiwiYWNjb3VudFNpZ25hdHVyZSI6ImovMldxYzAyTUFKMmdpY2lMMC9ZVGVWMkdmQXRzZU1JUEZOcVlmRDNHaEFxcko2a0gwRi9HU2JEVEdlK2VabHdsNnBkYS9QZFg3Y0hNT1prN01GR0F3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRVmxlL2pPSUJxSWpidCtBOHBQd1l5eFYyTC8yaEptMjJUR1lqY3BQS0ZOZER3Yi9VdXNad2dFMko4amU3cm82bFZYdkFHek5sakVYK05BOG5oL09Ddz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5OTkzOTI1MjoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJielgvNHFoNnFmMVlNT3VZbncyY2Z5VkFWVEg2amVXNWJWMC9GY1VNNkVLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0MTI1NzI3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUN1aSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Artemis fowl",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Artemis fowl",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
