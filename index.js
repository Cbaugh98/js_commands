


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
// // Imports the Google Cloud client library.
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

const Tesseract = require("tesseract.js");


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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});
    
client.on('message', async message => {
    const args = await message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = await args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
     await client.commands.get(command).execute(message, args)
     .then(function(value) {return value;}).catch(function(error) {return console.log(error)});
    } catch (error) {
      console.log(error);
      message.reply('<:pOg:778808585202434068>');
    } finally
    {message.channel.send(`:^)`);}
 });

client.login();
