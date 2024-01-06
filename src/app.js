/* IMPORTS */
const { BotClient } = require("./Model/Client.model");
const path = require("path")
const fs = require("fs")
const {Collection} = require("discord.js");
require("dotenv").config();
const express = require('express')
const app = express()

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new BotClient()
client.commands = new Collection()

const foldersPath = path.join(__dirname, "commands")

fs.readdir(foldersPath, (err, files) =>{
    if(err){
       console.log(err)
       return
    }

    for(let i=0; i<files.length; i++){
        try{
            const filepath = path.join(foldersPath, `${files[i]}`)
            const command = require(filepath)

            if("data" in command && "execute" in command){
                client.commands.set(command.data.name, command)
            } else {
                console.log(`[WARNING] The command at ${filepath} is missing a required "data" or "execute" property.`);
            }
        }catch(err){
            if(err){
                console.log("um erro ocoreu na leitura dos arquivos")
            }
        }
    }
})



client.once("ready", (e)=>{
   console.log("The bot is ready as", e.user.tag )
});
client.on("interactionCreate",async (interaction) =>{
    if(interaction.isAutocomplete()){
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command){
            console.error("The command Does not exists")
            return;
        }
        try {
            await command.autoComplete(interaction)
        } catch (error) {
            if(error){
                if(error.rawError.code === 500){
                    throw error
                }else{
                    console.log("um erro menor ocoreu");
                    console.error(error)
                }
            }
        }
    }
    if(!interaction.isChatInputCommand()){
        return;
    }
    const command = interaction.client.commands.get(interaction.commandName)    
    if(!command){
        interaction.reply("Me desculpe não ha comandos com esse nome")
        return;
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

client.start(BOT_TOKEN);


app.get("/", (req, res) =>{
    res.send("Bot funcionando")
})


module.exports = () => {};


