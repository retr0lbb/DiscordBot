const { Client, GatewayIntentBits } = require("discord.js")


 class BotClient extends Client{
    commands;
    constructor(){
        super({
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent
            ]
        })
    }
    start(TOKEN){
        this.login(TOKEN)
        console.log("Bot logado com sucesso")
    }
}

module.exports = {BotClient}
