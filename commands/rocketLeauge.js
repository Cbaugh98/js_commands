const { Client, MessageAttachment } = require('discord.js');
module.exports = {
	name: 'rl',
	description: 'returns ballchasing stats page',
    async execute(message, args) {
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
        message.channel.send(teamSheet);
        message.channel.send(playerSheet);
    },
};