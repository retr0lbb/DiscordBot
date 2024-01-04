const 
{ 
    EmbedBuilder,
    SlashCommandBuilder, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,

} = require("discord.js")
const results = require("../data/rituals.json")



module.exports = {
    data: new SlashCommandBuilder()
        .setName("todosrituais")
        .setDescription("Mostra todos os rituais de ordem paranormal")
        .addStringOption(option =>
            option.setName('ritual')
                .setDescription('o ritual que vc quer achar')
                .setRequired(true)),
        async execute(interac){



            

            const embedExample = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(results[0].nome)
                .setURL(results[0].imgSrc)
                .setDescription(results[0].descricao)
                .setThumbnail(results[0].imgSrc)
                .addFields(
                    {name: "Elemento", value: results[0].elemento},
                    {name: "Duração", value: results[0].duracao},
                    {name: "alcance", value: results[0].alcance},
                    {name: "execucao", value: results[0].execucao},
                    {name: "alvo", value: results[0].alvo}
                )
                .setImage(results[0].imgSrc)

            



            try {
                
                await interac.reply({ embeds: [embedExample] });
                
            } catch (error) {
                console.log(error)
            }
        }
}