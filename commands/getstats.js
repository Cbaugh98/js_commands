const { createWorker} = require('tesseract.js');
const {Overwatch} = require('./tesseract/Statscreen.json');
module.exports = {
	name: 'getstats',
	description: 'copys message and paste message in a specific channel',
	execute(message,args) {
        try{
            const worker = createWorker({logger: m => console.log(m),});
            console.log(message.attachments.firstKey());
            if(args[0] === undefined && message.attachments == null) {
                
                message.channel.send('You need to have an image attached to the message');
                console.error();
            }
            
            /**
             * TODO: add url handling  
             */
            if(args[0] === 'overwatch') {
                message.channel.startTyping();
                (async () => {
                    const image = await message.attachments.get(message.attachments.firstKey()).url;
                    const rectangle = await Overwatch.rectangle;
                    await worker.load();
                    await worker.loadLanguage('eng');
                    await worker.initialize('eng');
                    await worker.setParameters({
                      tessedit_char_whitelist: '0123456789-',
                    });
                    const { data: { text } } = await worker.recognize(image,{rectangle});
                   
                    await worker.terminate();
                    message.channel.stopTyping();
                    message.channel.send(text);
                  })();
            if(args[0] === 'rl') {
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
            }
            
            }

        }catch(err) {
            
            message.channel.stopTyping();
            message.channel.send('make Sure theire is an image in your message');
            console.error(err);
        }
        
        

    },
};