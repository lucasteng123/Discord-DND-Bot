import Discord from "discord.js";
import config from "./conf/main";
import fs from "fs";


const DiceRoller = require("./libs/DieRoller");
const postUpcomingGame = require("./command_handlers/postUpcomingGame");
const Poll = require("./command_handlers/poll");

const client = new Discord.Client();

var prefix = config.prefix



client.once("ready", () => {
  
  
});

client.on("message",message=>{
  if(!message.guild) return
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
    message.author.send({embed:config.helpMessageUser})
    message.delete()
  }


})

client.login(config.token);



