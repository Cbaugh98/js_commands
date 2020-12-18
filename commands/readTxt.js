
const { createWorker} = require('tesseract.js');
const {Overwatch} = require('./tesseract/Statscreen.json');
module.exports = {
	name: 'readtxt',
	description: 'copys message and paste message in a specific channel',
	execute(message,args) {
        try{
            
            console.log('check');
            // await message.channel.startTyping();
            const worker = createWorker({logger: m => console.log(m),});
            console.log(message.attachments.firstKey());
            if(args[1] === undefined) {
                message.channel.send('You need to have an image attached to the message');
                return;
            }

            /**
             * TODO: add url handling  
             */
            if(args[0] === 'overwatch') {
                message.channel.startTyping();
                const rectangle = Overwatch.rectangle;

            
                (async () => {
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
                console.log();

            }

        }catch(err) {
            console.error(err);
            message.channel.stopTyping();
        }
        
        

    },
};