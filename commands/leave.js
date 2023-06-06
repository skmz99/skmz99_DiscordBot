const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Kick the bot from the channel."),
	execute: async ({ client, interaction }) => {

        // Get the current queue
		const queue = client.player.nodes.get(interaction.guildId)

        // Deletes all the songs from the queue and exits the channel
		queue.delete();

        await interaction.reply("Leaving")
	},
}