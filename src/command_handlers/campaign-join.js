import https from "https";
import Discord from "discord.js";
import config from "../conf/main";
import fs from "fs";

module.exports = (message,state) => {
    if(!message.guild) return
    if (message.attachments.first()) {
        let file = message.attachments.first(); //this is the attchment you choose to use
        https.get(file.url, function(res){
          var body = '';
      
          res.on('data', function(chunk){
              body += chunk;
          });
          
          res.on('end', function(){
              try{
                var json = JSON.parse(body);
              } catch (e) {
                message.author.send(`Had an issue with the JSON file: ${e}`)
                return
              }
    
              if(!json.game || !json.sessionName || !json.description){
                message.author.send("Missing required data from JSON, please ensure it has at least the `game`, and `description` fields")
                return
              }
              if(json.addToRole && !json.role){
                  message.author.send("You have specified that you want to add people to a role when they say yes, but have not specified a role")
              }
              
    
              var dmName
              var dmPhoto
              
                if(json.DM){
                  try{
                    var guild = message.guild
                    var dmMember = guild.members.find(member => member.id == json.DM)
                    dmName = "DM: " + dmMember.displayName
                    dmPhoto = dmMember.user.displayAvatarURL
                  } catch (e){
                    console.log(e)
                    dmName = "DM: " + message.member.displayName
                    dmPhoto = message.author.displayAvatarURL
                    
                  }
    
                } else {
                  dmName = "DM: " + message.member.displayName
                  dmPhoto = message.author.displayAvatarURL
                }
                
              
              var embedMessage = new Discord.RichEmbed()
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .setTitle(json.sessionName)
                .setDescription(json.description)
                .addField("System",json.game)
                
                //.addField("DM",dmName)
                
              if(dmPhoto){
                embedMessage.setAuthor(dmName,dmPhoto)
              } else {
                embedMessage.setAuthor(dmName)
              }
              if (json.image) embedMessage.setImage(json.image)
              if (json.URL) embedMessage.setURL(json.URL)
              if (json.time) embedMessage.addField("Time",json.time,true)
              if(json.thumbnail) embedMessage.setThumbnail(json.thumbnail)
              if(json.customFields){
                json.customFields.forEach(field=>embedMessage.addField(field.name,field.value,field.inline||false))
              }
              if(json.voteForAvailable) embedMessage.addField(`Please vote if you wish to join this campaign:`,`Type \`!join ${json.shortname}\``)
              if(json.voteForAvailable) state.joinableCampaigns[json.shortname.toLowerCase()] = {role: json.role, max: json.maxslots, currentJoined:0}

              if(json.maxslots) embedMessage.addField(`Max Players`,json.maxslots);
              if(json.DM != message.author.id) embedMessage.setFooter(`Posted by ${message.member.displayName}`,message.author.displayAvatarURL)
    
              message.channel.send(embedMessage)
                .then(message =>{
                  if(json.pin) message.pin()
                  console.log(state);
                })
          });
      }).on('error', function(e){
            message.author.send(`Ran into an error: ${e}`);
      });
        
      } else {
        message.author.send("Please attach a JSON file with your event details.")
      }
      if(message.guild) message.delete()
}