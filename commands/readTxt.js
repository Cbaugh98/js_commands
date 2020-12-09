const { Message, MessageAttachment, Channel } = require("discord.js");
const Tesseract = require('tesseract.js');
module.exports = {
	name: 'readtxt',
	description: 'copys message and paste message in a specific channel',
	async execute(message,args) {
        message.reply('starting your request');``
        try{
            const attachMap =  message.attachments;
            const file =  attachMap.get(attachMap.firstKey());
            
            let txt = await Tesseract.recognize(file.url,'eng').then(({ data: { text } }) => {
            return text;
        });
            message.reply(txt);
            message.reply(file.url);
        }
        catch(error) {
            console.log(error);
            message.content.send("nope");
        }
            

	},
};