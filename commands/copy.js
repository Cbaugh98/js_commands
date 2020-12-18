const { Message, MessageAttachment, Channel } = require("discord.js");
const {Tesseract} = require('tesseract.js');
module.exports = {
	name: 'copy',
	description: 'copys attachment url and paste url',
	async execute(message,args) {
		try{
            const attachMap = message.attachments;
			const file = attachMap.get(attachMap.firstKey());
			message.channel.send(file.url);
		} catch(error) {
			console.error(error);
		}
	}
};