export default {
    token:"",//Enter your discord bot token here
    prefix:"!",
    helpMessageDM:"Possible Commands:\n *channel manipulation*\n`!startvote`:Starts a vote in this channel, stops people from being able to chat in it\n  `!endvote`:Stops the vote, allows people to chat in the voting channel again.\n`!configvotingpower @person #`: Configure how many votes a single person has\n~~!setdaychat:sets this channel to be active during the day, and not at night~~\n\n*Game Functions*\n`!vote @user`:Vote in an active voting channel\n~~!endday:ends the day, closes chats and active votes.~~\n~~!endnight:same as above, but opens chats~~",
    helpMessageUser:"Possible Commands:\n `!vote @user`,\n`!vote nokill`",
    introduction:"Doing this to get away from the tedium of the heart of gold, feel free to ignore me most of the time, like everyone else does.",
    server:{
        gameStarted:false,
        day:true,
        power:{},
        targets:{},
        votes: {},
        daychats:{},
        sulknumber:0,
        sulking:false,
        sulker:null,
        sulker_original_name: "",
        aliveRoleID:null,
        gmRoleID:null
    }
}