import {
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';

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

    data: new SlashCommandBuilder()
        .setName('gameservers')
        .setDescription('Show the status of game servers'),

    async execute(interaction) {

        await interaction.deferReply();

        const embeds = [];
        const components = [];

        for (const server of GAME_SERVERS) {

            const data = await queryGameServer(server);

            embeds.push(
                createServerEmbed(server, data)
            );

            components.push(
                createServerButtons(server)
            );
        }

        await interaction.editReply({
            embeds,
            components
        });
    }
};