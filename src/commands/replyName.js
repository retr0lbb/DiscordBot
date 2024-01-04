const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("replyname")
        .setDescription("take an input name and reply that name")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('none none nonoeonnoeneoneoneo')
                .setRequired(true)
                ),
        async execute(interac){
            const name = interac.options.getString("input")
            await interac.reply(`The name is ${name}`)
        }
}