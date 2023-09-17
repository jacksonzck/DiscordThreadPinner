const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register_channel')
		.setDescription('Registers the channel to enable user thread pinning.'),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		// Find what base channel we're operating in.
		if (interaction.channel.isThread()) {
			channel_id = interaction.channel.parentId
		} else {
			channel_id = interaction.channelId
		} 
		// Check to see if the original caller has permissions to pin messages in this channel.  
		const permissions = interaction.channel.permissionsFor(interaction.member)
		if (!permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			await interaction.reply({content: "You need the manage messages permission in this channel to do this.", ephemeral: true})
			return
		}

		// If the server has a hiccup and can't do this in three seconds...
		// (Because discord requires an interaction response by then)
		// Uh, that won't be good.
		// Let's hope that doesn't happen! :D
		// (Benefits of recreational coding - no code reports!)

		// Make guild data if it didn't exist before.
		const filepath = "data/" + interaction.guildId + ".json"
        if (fs.existsSync(filepath)) {
		} else {
			fs.writeFileSync(filepath, "{}")
		}
		guildInformation = JSON.parse(fs.readFileSync(filepath))
		guildInformation[channel_id] = true
		fs.writeFileSync(filepath, JSON.stringify(guildInformation))
        await interaction.reply({content: "Registered channel successfully.", ephemeral: true})
	},
};