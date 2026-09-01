import {
    GAME_SERVERS
} from './serverConfig.js';

import {
    queryGameServer
} from './gameQueryService.js';

import {
    createServerEmbed,
    createServerButtons
} from './serverEmbed.js';

export async function updateGameServerMessage(
    client,
    channelId,
    messageId,
    serverId
) {

    const server =
        GAME_SERVERS.find(
            item => item.id === serverId
        );

    if (!server) {
        throw new Error(
            `Game server "${serverId}" not found`
        );
    }

    const channel =
        await client.channels.fetch(channelId);

    if (!channel) {
        throw new Error(
            `Channel "${channelId}" not found`
        );
    }

    const message =
        await channel.messages.fetch(messageId);

    if (!message) {
        throw new Error(
            `Message "${messageId}" not found`
        );
    }

    const data =
        await queryGameServer(server);

    await message.edit({
        embeds: [
            createServerEmbed(server, data)
        ],
        components: [
            createServerButtons(server)
        ]
    });

    return data;
}