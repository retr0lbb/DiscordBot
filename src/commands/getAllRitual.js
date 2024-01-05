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
function GetRitalElementColor(ritualElement){

    let color;
    switch (ritualElement) {
        case "** Energia **":
            color = 0x8332AC;
        break
        case "** Medo **":
            color = 0xDED6D6;
            break
        case "** Sangue **": 
            color = 0xED1C24;
            break
        case "** Conhecimento **":
            color = 0xBAB700;
            break
        case "** Morte **":
            color = 0x342E37;
            break
        default:
            color = 0x3C91E6;
        break;
    }
    return color
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("todosrituais")
        .setDescription("Mostra todos os rituais de ordem paranormal")
        .addStringOption(option =>
            option.setName('ritual')
                .setDescription('o ritual que vc quer achar')
                .setRequired(true)
                .setAutocomplete(true)),
        
        
        
            
            //main
            async autoComplete(interact) {
                const focusedValue = interact.options.getFocused();

                // Aqui você pode gerar dinamicamente as opções de autocompletar com base nos resultados
                const ritualNames = results.map((ritual) => ritual.nome);
                const filtered = ritualNames.filter((ritualName) => ritualName.startsWith(focusedValue));
                console.log(filtered)
                // Limitar o número de opções de autocompletar para 25
                const limitedChoices = filtered.slice(0, 25);
            
                // Responder com as opções de autocompletar limitadas
                await interact.respond(
                    limitedChoices.map((choice) => ({ name: choice, value: choice }))
                );
            },
            async execute(interac){
            try {
                 /**
             * Ritual and embed Builder
             */
            const ritualName = interac.options.getString("ritual")
            const ritual = GetSelectedRitual(ritualName)
            const embedExample = new EmbedBuilder()
                .setColor(GetRitalElementColor(ritual.elemento))
                .setTitle(ritual.nome)
                .setDescription(ritual.descricao)
                .setThumbnail(ritual.imgSrc)
                .addFields(
                    {name: "Elemento", value: ritual.elemento},
                    {name: "Duração", value: ritual.duracao},
                    {name: "alcance", value: ritual.alcance},
                    {name: "execucao", value: ritual.execucao},
                    {name: "alvo", value: ritual.alvo},
                    {name: `Discente (+${ritual.discente.custo}PE)`, value: ritual.discente.desc},
                    {name: `Verdadeiro (+${ritual.verdadeiro.custo}PE)`, value: ritual.verdadeiro.desc}
                )
                .setImage(ritual.imgSrc)

                await interac.reply({ embeds: [embedExample] });
                
            } catch (error) {
                await interac.reply("Ocorreu um erro na busca do ritual tente escrever como esta no auto complete")
            }
        }
}