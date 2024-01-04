const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Bot shoud reply with pong"),
        async execute(interac){
            await interac.reply("Poiiiiing")
        }
}