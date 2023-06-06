const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 5 songs in the queue"),

    execute: async ({ client, interaction }) => {
        const queue = client.player.nodes.get(interaction.guildId)

        // check if there are songs in the queue
        if (queue.isEmpty())
        {
            await interaction.reply(`There are no songs in the queue`);
            return;
        }

        // Get the first 5 songs in the queue
        console.log(queue.tracks.data);
        const queueString = queue.tracks.data.slice(0, 5).map((song, i) => {
            return `${i}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`
        }).join("\n")

        // Get the current song
        const currentSong = queue.currentTrack

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently Playing**\n` + 
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.username}>` : "User") +
                        `\n\n**Queue**\n${queueString}`
                    )
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
    }
}