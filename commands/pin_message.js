const { ContextMenuCommandBuilder, ApplicationCommandType, ContextMenuCommandInteraction, MessageContextMenuCommandInteraction } = require('discord.js');
const fs = require('fs')

module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('Pin Message')
	.setType(ApplicationCommandType.Message)
    .setDMPermission(false),
    /**
     * 
     * @param {MessageContextMenuCommandInteraction} interaction 
     */
    async execute(interaction) {
        // Check if we're in a thread in the first place.
        if(!interaction.channel.isThread()) {
            await interaction.reply({content: "Discord Thread Pinner only can pin messages in threads.", ephemeral: true})
            return
        }
        // Check if this is a registered channel.
        const filepath = "data/" + interaction.guildId + ".json"
        if(!fs.existsSync(filepath)) {
            await interaction.reply({content: "Channel is unregistered for thread pinning.", ephemeral: true})
            return
        }
        guildInformation = JSON.parse(fs.readFileSync(filepath))
        if (! (guildInformation[interaction.channel.parentId] == true)) {
            await interaction.reply({content: "Channel is unregistered for thread pinning.", ephemeral: true})
            return
        }
        // Check if the user is the original poster of the thread. 
        if(interaction.user.id != interaction.channel.ownerId) {
            await interaction.reply({content: "This command can only be done by the owner of the thread.", ephemeral: true})
            return
        }
        // Check to see if the message is already pinned. If so unpin it, if not pin it.
        if(!interaction.targetMessage.pinned) {
            await interaction.reply({content: "Pinning message.", ephemeral: true})
            await interaction.targetMessage.pin()
            return
        } else {
            await interaction.reply({content: "Unpinning message.", ephemeral: true})
            await interaction.targetMessage.unpin()
            return
        }
    },
}