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



/// NÂO MEXE PQ TA FUNCIONANDO



function GetSelectedRitual(ritualName){
    if(!ritualName){
        console.log("Não ha rituais com esse nome no sistema")
        return;
    }
    let selectedRitual;
    for(let i = 0; i<= results.length; i++ ){
        if(ritualName == results[i]["nome"]){
            selectedRitual = results[i];
            break;
        }
    }
    return selectedRitual;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todosrituais")
        .setDescription("Mostra todos os rituais de ordem paranormal")
        .addStringOption(option =>
            option.setName('ritual')
                .setDescription('o ritual que vc quer achar')
                .setRequired(true)),
        
        
        
                async execute(interac){
            const ritualName = interac.options.getString("ritual")

            const ritual = GetSelectedRitual(ritualName)

            const embedExample = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(ritual.nome)
                .setURL(ritual.imgSrc)
                .setDescription(ritual.descricao)
                .setThumbnail(ritual.imgSrc)
                .addFields(
                    {name: "Elemento", value: ritual.elemento},
                    {name: "Duração", value: ritual.duracao},
                    {name: "alcance", value: ritual.alcance},
                    {name: "execucao", value: ritual.execucao},
                    {name: "alvo", value: ritual.alvo}
                )
                .setImage(ritual.imgSrc)

            



            try {
                
                await interac.reply({ embeds: [embedExample] });
                
            } catch (error) {
                console.log(error)
            }
        }
}