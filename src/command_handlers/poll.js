const randomEmoji = require("../libs/emojis")
import Discord from "discord.js";
import fs from "fs";

module.exports = (message,commandString) => {
    //trim the command off the front of the 
    var messageText = message.content
    var input = messageText.replace(commandString,"")

    var slicedMessage = input.split(/,/g)
    
    //remove whitespace from front of elements
    slicedMessage.forEach(element => {
        element = element.replace(/^\s+/g, '');
    });

    //TODO add in error message
    if(slicedMessage.length<2) return

    //grab the first arg as the question
    var messageToSend = slicedMessage.shift()

    var emojis=[]
    slicedMessage.forEach(answer => {
        var emoji = randomEmoji()
        messageToSend += `\n${emoji}: ${answer}`
        emojis.push(emoji);
    })
    message.channel.send(messageToSend).then(msg=>{
        emojis.forEach(emoji => {
            msg.react(emoji)
        });
    })
    
}