module.exports = {
	name: 'lol',
	description: 'Stats for leauge',
	execute(message, args) {
        message.channel.send(args);
		name: args[0];
		
	},
};