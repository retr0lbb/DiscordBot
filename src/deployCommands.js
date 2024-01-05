const { REST, Routes } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const applicationId = process.env.APLICATION_ID;

const commandFolder = path.join(__dirname, "commands");
const commands = [];

async function readCommands() {
    try {
        const files = await fs.promises.readdir(commandFolder);
        
        for (const file of files) {
            const filePath = path.join(commandFolder, file);
            const command = require(filePath);
            console.log(file[0])

            if ("data" in command && "execute" in command, "description" in command.data) {
                commands.push(command.data.toJSON());
                console.log(commands);
            } else {
                console.log("Comando não possui os recursos necessários:", file);
            }
            if ("autoComplete" in command) {
                commands.push({
                    name: command.data.name,
                    type: 2,
                    
                });
            }
        }
    } catch (err) {
        console.error("Erro ao ler comandos:", err);
    }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    await readCommands();

    try {
        console.log(`Iniciando atualização de ${commands.length} comandos de aplicação (/).`);

        const data = await rest.put(
            Routes.applicationGuildCommands(applicationId, guildId),
            { body: commands },
        );

        console.log(data);
        console.log(`Recarregou com sucesso ${data.length} comandos de aplicação (/).`);
    } catch (err) {
        console.error(err);
    }
})();
