const logger = require("../logger");
const {CountingChannel} = require('../database/models');


module.exports = async (e) => {
    logger.info(`MessageCreate interaction for user [discordSnowflake=${e.author.id}]`);

    if(e.author.bot === true) return;

    const countingChannel = await CountingChannel.findOne({where: {channelId: e.channel.id}});

    if(countingChannel){
        const mappedCountingChannel = countingChannel.get();
        if(Number(e.content) === mappedCountingChannel.currentNumber + 1){
            const currentNumber = mappedCountingChannel.currentNumber + 1;
            const updateObject = {currentNumber: currentNumber};
            if(mappedCountingChannel.maxCount < currentNumber){
                updateObject.maxCount = currentNumber;
            }
            await CountingChannel.update(updateObject, {where: {channelId: e.channel.id}});
        } else {
            await CountingChannel.update({currentNumber: 0}, {where: {channelId: e.channel.id}});
            await e.reply('Counting has restarted from 0');
        }
    }
};