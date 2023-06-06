const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, Embed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song")
        .addSubcommand(subcommand=>
            subcommand
            .setName("current")
            .setDescription("Skip Current Song")
        ),
        // .addSubcommand(subcommand =>
		// 	subcommand
		// 		.setName("index")
		// 		.setDescription("Skip Song From Index")
		// 		.addStringOption(option =>
		// 			option.setName("index").setDescription("Skip Song From Index").setRequired(true)
		// 		)
		// ),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = await client.player.nodes.get(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        if (interaction.options.getSubcommand() == 'current'){

            const currentSong = queue.currentTrack
            
            // Skip the current song
            queue.node.skip()
            
            // Return an embed to the user saying the song has been skipped
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been skipped!`)
                    .setThumbnail(currentSong.thumbnail)
                ]
            })
        }
        return
	},
}