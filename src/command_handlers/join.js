const randomEmoji = require("../libs/emojis")
import Discord from "discord.js";
import fs from "fs";

module.exports = (message,commandString,state) => {
    if(!message.guild) return
    //trim the command off the front of the 
    var messageText = message.content
    var input = messageText.replace(commandString,"")

    
    
    //remove whitespace from front of element
    input = input.replace(/^\s+/g, '');
    input = input.toLowerCase();

    if(!state.joinableCampaigns[input]){
        message.author.send("Cannot find campaign. Please ensure you are entering it properly");
        message.delete()
        return
    }
    if(state.joinableCampaigns[input].currentJoined >= state.joinableCampaigns[input].max){
        message.channel.send("Slots filled, please message the DM for more info!");
        message.delete()
        return
    }
    if(message.member.roles.some(role=>role.name === state.joinableCampaigns[input].role)){
        message.author.send("You are already part of the campaign")
        message.delete()
        return
    }
    var role = message.guild.roles.find(role => role.name === state.joinableCampaigns[input].role);
    if(!role){
        message.author.send("Error adding you to the role. Contact the DM");
        message.delete()
        return
    }

    message.member.addRole(role);
    message.author.send("Welcome to the campaign!")
    message.delete()
    state.joinableCampaigns[input].currentJoined++;
    console.log(state);
    
}