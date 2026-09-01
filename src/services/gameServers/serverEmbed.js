const { EmbedBuilder } = require('discord.js');
const { servers, embedColorOnline, embedColorOffline } = require('./serverConfig');

function buildServerEmbed(serverId, serverData) {
    const config = servers.find(s => s.id === serverId);
    const isOnline = serverData.online;

    const embed = new EmbedBuilder()
        .setColor(isOnline ? embedColorOnline : embedColorOffline)
        .setTitle(`${config.emoji} ${config.name}`)
        .setDescription(`**📡 الحالة:** ${isOnline ? '🟢 Online' : '🔴 Offline'}`)
        .addFields(
            { name: '🌍 الخريطة', value: serverData.map || 'غير معروف', inline: true },
            { name: '👥 اللاعبين', value: `${serverData.players}/${serverData.maxPlayers}`, inline: true },
            { name: '🔗 العنوان', value: `\`${config.ip}:${config.port}\``, inline: false }
        )
        .setFooter({ 
            text: `آخر تحديث: ${new Date().toLocaleString('ar-EG')}` 
        });

    // إضافة قائمة اللاعبين إذا كان الخادم متصلاً
    if (isOnline && serverData.playerList && serverData.playerList.length > 0) {
        const playerList = serverData.playerList
            .map((p, i) => `${i+1}. ${p}`)
            .join('\n');
        
        embed.addFields({
            name: '🟢 اللاعبون المتصلون',
            value: playerList.length > 1024 ? playerList.slice(0, 1024) + '...' : playerList,
            inline: false
        });
    }

    return embed;
}

module.exports = { buildServerEmbed };
