const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { fetchServerInfo } = require('../../services/gameServers/gameQueryService');
const { buildServerEmbed } = require('../../services/gameServers/serverEmbed');
const { servers } = require('../../services/gameServers/serverConfig');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gameservers')
        .setDescription('عرض معلومات خوادم الألعاب')
        .addStringOption(option =>
            option.setName('الخادم')
                .setDescription('اختر الخادم')
                .setRequired(true)
                .addChoices(
                    ...servers.map(s => ({ name: s.name, value: s.id }))
                )
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const serverId = interaction.options.getString('الخادم');
        const serverConfig = servers.find(s => s.id === serverId);
        const serverData = await fetchServerInfo(serverConfig);

        const embed = buildServerEmbed(serverId, serverData);

        // زر التحديث
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`refresh_server_${serverId}`)
                    .setLabel('🔄 تحديث')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.editReply({ 
            embeds: [embed], 
            components: [row] 
        });
    }
};
