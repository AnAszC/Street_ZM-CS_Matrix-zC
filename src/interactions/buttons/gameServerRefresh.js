const { fetchServerInfo } = require('../../services/gameServers/gameQueryService');
const { buildServerEmbed } = require('../../services/gameServers/serverEmbed');
const { servers } = require('../../services/gameServers/serverConfig');

module.exports = {
    customId: /^refresh_server_.+$/,

    async execute(interaction) {
        const serverId = interaction.customId.replace('refresh_server_', '');
        const serverConfig = servers.find(s => s.id === serverId);

        await interaction.deferUpdate();

        const serverData = await fetchServerInfo(serverConfig);
        const embed = buildServerEmbed(serverId, serverData);

        await interaction.editReply({ embeds: [embed] });
    }
};
