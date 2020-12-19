//fs is the node files system allows me to export new stuff
const fs = require('fs');
require('dotenv').config(); //testing this
///////////////////////////////////discord requirements
const Discord = require('discord.js');
const client = new Discord.Client();
///////////////////////////////////end



////////////////////////////.env
const config = {
  prefix : process.env.PREFIX,
  owner : process.env.OWNER
};
/////////////////////////////////
//Abandoned idea
// Imports the Google Cloud client library.
// const {Storage} = require('@google-cloud/storage');

// // Instantiates a client. Explicitly use service account credentials by
// // specifying the private key file. All clients in google-cloud-node have this
// // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// // const projectId = 'project-id'
// // const keyFilename = '/path/to/keyfile.json'
// const storage = new Storage();

// // Makes an authenticated API request.
// async function listBuckets() {
//   try {
//     const [buckets] = await storage.getBuckets();

//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
// }
// listBuckets();
////////////////////////////////////////////////////////////////

const {createWorker,createScheduler} = require("tesseract.js");
// try {
//   const scheduler = createScheduler();
//   const workers= {};
//   for(let i = 0; i < 4; i++){
//      workers[`w${i}`] = createWorker({
//       logger: m => console.log(m),
//     });
//   }
//   (async () => {
//     for(const w in workers) {
//       await w.load();
//       await w.loadLanguage('eng');
//       await w.initialize('eng');
//       await w.setParameters({
//         tessedit_char_whitelist : '0123456789-',
//         tessedit_pageseg_mode	: '12',
//     })
//       await scheduler.addWorker(w);
//     }
//     console.log('workersScheduled');
//   })
// } catch(err){
//   console.error(err);
//   console.log('nope');
// }



/////////////////////////////creates command handling
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  //creates an array of command files that end in.js
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}
/////////////////////////////end of commmand handling

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
    
client.on('message', async message => {
  
    const args = await message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = await args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
     await client.commands.get(command).execute(message, args);
    } catch (error) {
      console.log(error);
      message.channel.send('Their was an error make sure you put the command in correctly');
    }
 });

client.login();
