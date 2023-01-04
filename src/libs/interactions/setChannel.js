const { SlashCommandBuilder } = require('discord.js');
const {CountingChannel} = require('../database/models');

module.exports = {
    data: new SlashCommandBuilder()
                            .setName('setchannel')
                            .setDescription('Sets the counting channel for counting')
                            .addChannelOption(opt => opt.setName('channel').setDescription('The channel to count in')),
    async execute(interaction, user) {
        const channel = interaction.options.get('channel').value;
        await new CountingChannel({channelId: channel, currentNumber: 0, guildId: interaction.guild.id, maxCount: 0,}).save();

        await interaction.reply('Succesfully set counting channel!');
    }
}