const { Message, MessageAttachment, Channel } = require("discord.js");
const {Tesseract} = require('tesseract.js');
module.exports = {
	name: 'copy',
	description: 'copys message and paste message in a specific channel',
	async execute(message,args) {
		try{
            const attachMap = message.attachments;
			const file = attachMap.get(attachMap.firstKey());
			message.channel.send(file.size/1000 + "kb");
		} catch(error) {
			console.log(error);
		}
	}
};