const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song")
        .addSubcommand(subcommand=>
            subcommand
            .setName("current")
            .setDescription("Skip Current Song")
        )
        .addSubcommand(subcommand =>
			subcommand
				.setName("index")
				.setDescription("Skip Song From Index")
				.addStringOption(option =>
					option.setName("index").setDescription("Skip Song From Index").setRequired(true)
				)
		),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = await client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        if (interaction.options.getSubcommand() == 'current'){

            const currentSong = queue.current
            
            // Skip the current song
            queue.skip()
            
            // Return an embed to the user saying the song has been skipped
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setDescription(`${currentSong.title} has been skipped!`)
                    .setThumbnail(currentSong.thumbnail)
                ]
            })
        }
        else if(interaction.options.getSubcommand() == 'index'){
            const queueSize = queue.tracks.length
            let index = interaction.options.getString("index")
            if (queueSize < index || index < 0){
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`Index ${index} is out of bounds. Size of Queue is ${queueSize}`)
                    ]
                })
            }
            else if(index == 0){
                const currentSong = queue.current
            
                // Skip the current song
                queue.skip()
                
                // Return an embed to the user saying the song has been skipped
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`**${currentSong.title}** has been skipped!`)
                        .setThumbnail(currentSong.thumbnail)
                    ]
                })
            }
            else{
                queue[i].skip()
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`**${queue[i]}** has been skipped!`)
                        .setThumbnail(queue[i].thumbnail)
                    ]
                })
            }
            return
        }
	},
}