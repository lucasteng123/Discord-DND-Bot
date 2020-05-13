import Discord from "discord.js";
import config from "./conf/main";
import fs from "fs";


const DiceRoller = require("./libs/DieRoller");
const postUpcomingGame = require("./command_handlers/postUpcomingGame");
const Poll = require("./command_handlers/poll");

const client = new Discord.Client();

var prefix = config.prefix

const helpMessage = {
	color: 0x0099ff,
	title: 'Marvin Help',
	fields: [
		{
			name: 'help',
			value: 'Will show this help document',
        },
        {
			name: 'newevent',
			value: 'Create a New Event post, you must upload a .json file with all of the details of your event. Contact <@180861025690714112> for more details.',
        },
        {
			name: 'roll',
			value: 'Roll any combination of dice, and do any math required on the result. Example `!roll (1d6+2d8)*2+5`',
        },
        {
      name: 'poll',
      value: 'create a new poll. Add a question followed by a comma-seperated list of answers. Ex. `!poll Question?, Answer 1, Answer 2, Answer 3, Answer 4'
        }
		
	],
	timestamp: new Date(),
}




client.once("ready", () => {
  
  
});

client.on("message",message=>{
  
  if(!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content
		.slice(prefix.length)
		.toLowerCase()
		.trim()
    .split(/ +/g);
    
  const command = args.shift().toLowerCase();

  if (command == "newevent") postUpcomingGame(message)
  if (command == "roll") DiceRoller(message,prefix+"roll")
  if (command == "poll") Poll(message,prefix+"poll")
  if (command == "changeprefix"){
    if(args[0]){
      prefix = args[0]
      message.channel.send(`Changed prefix to: ${prefix}`)
    } else {
      message.author.send("Please specify a prefix")
      message.delete()
    }
  }
  if (command == "help"){
    message.channel.send({embed:helpMessage})
    message.delete()
  }


})

client.login(config.token);



