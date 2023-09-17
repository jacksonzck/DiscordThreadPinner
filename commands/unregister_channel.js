const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');
const fs = require('fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unregister_channel')
		.setDescription('Unregisters the channel from user thread pinning.'),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		// Check to see if the original caller has permissions to pin messages in this channel.  
		const permissions = interaction.channel.permissionsFor(interaction.member)
		if (!permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			await interaction.reply({content: "You need the manage messages permission in this channel to do this.", ephemeral: true})
			return
		}

		const filepath = "data/" + interaction.guildId + ".json"
        if (fs.existsSync(filepath)) {
		} else {
			fs.writeFileSync(filepath, "{}")
		}
		guildInformation = JSON.parse(fs.readFileSync(filepath))	
		delete guildInformation[interaction.channelId]
		fs.writeFileSync(filepath, JSON.stringify(guildInformation))
        await interaction.reply({content: "Unregistered channel successfully.", ephemeral: true})
	},
};