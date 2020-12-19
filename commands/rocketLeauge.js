const { MessageAttachment } = require("discord.js");

module.exports = {
	name: 'rl',
	description: 'takes a ballchasing url and returns its csv file',
    async execute(message, args) {
        try {
        console.log(typeof args[0]);
        const preid = args[0].replace('https://ballchasing.com/replay/', '');
        const tagCheck = preid.indexOf('#');
        let id = {};
        if (tagCheck!==-1){
            id.isArray = true;
            id.prop = preid.split('#');
        }
        else{
            id.isArray = false;
            id.prop = preid;
        }
        console.log({id})
        const playerSheet  = `https://ballchasing.com/dl/stats/players/${id.prop}/${id.prop}-players.csv`;
        const teamSheet = `https://ballchasing.com/dl/stats/teams/${id.prop}/${id.prop}-team-stats.csv`;
        const playerCSV = new MessageAttachment(playerSheet,`player ${id.prop}`);
        const teamCSV = new MessageAttachment(teamSheet, `team ${id.prop}`);
        message.channel.send(playerCSV);
        message.channel.send(teamCSV);
    } catch (err) {
        console.error(err);
        message.channel.send('make sure you your link is valid');
        return err;
    }
    },
};