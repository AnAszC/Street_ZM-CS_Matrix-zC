import {
    GAME_SERVERS
} from '../../services/gameServers/serverConfig.js';

import {
    queryGameServer
} from '../../services/gameServers/gameQueryService.js';

import {
    createServerEmbed,
    createServerButtons
} from '../../services/gameServers/serverEmbed.js';

export default {

    name: 'server_refresh_zombie-plague',

    async execute(interaction) {

        const server =
            GAME_SERVERS.find(
                item => item.id === 'zombie-plague'
            );

        if (!server) return;

        await interaction.deferUpdate();

        const data =
            await queryGameServer(server);

        await interaction.message.edit({
            embeds: [
                createServerEmbed(server, data)
            ],
            components: [
                createServerButtons(server)
            ]
        });
    }
};