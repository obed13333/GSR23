const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder} = require('discord.js');
const { CountingChannel } = require('../database/models');

module.exports = {
  data: new SlashCommandBuilder()
                                .setName('leaderboard')
                                .setDescription('A command that returns a counting leaderboard'),
  async execute(interaction, user) {
    const countingChannels = await CountingChannel.findAll({
      order: [['maxCount' , 'desc']],
      limit: 5,
    });

    const fields = [];

    const mappedCountingChannels = countingChannels.map(x => x.get());
    mappedCountingChannels.forEach(async channel => {
      const guild = interaction.client.guilds.cache.get(channel.guildId);

      fields.push({name: guild.name, value: channel.maxCount.toString()});
    });

    const embed = new EmbedBuilder()
                              .setTitle('Counting Leaderboard')
                              .setDescription('A leaderboard for counting')
                              .addFields(fields); 
                              
    await interaction.reply({content: 'Leaderboard:', embeds: [embed]});
  }
}