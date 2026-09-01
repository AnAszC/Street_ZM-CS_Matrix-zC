import {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

function escapeMarkdown(text = '') {
    return String(text)
        .replace(/\\/g, '\\\\')
        .replace(/([_*~`|])/g, '\\$1');
}

export function createServerEmbed(server, data) {

    const color = data.online
        ? 0x2ecc71
        : 0xe74c3c;

    const status = data.online
        ? '🟢 Online'
        : '🔴 Offline';

    const embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`🎮 ${server.name}`)
        .setTimestamp();

    if (data.online) {

        embed.addFields(
            {
                name: 'Status',
                value: status,
                inline: true
            },
            {
                name: 'Address:Port',
                value: `\`${server.host}:${server.port}\``,
                inline: true
            },
            {
                name: 'Country',
                value: `🇺🇸 ${server.country}`,
                inline: true
            },
            {
                name: 'Game',
                value: escapeMarkdown(
                    data.game || 'Counter-Strike 1.6'
                ),
                inline: true
            },
            {
                name: 'Current Map',
                value: `\`${data.map || 'Unknown'}\``,
                inline: true
            },
            {
                name: 'Players',
                value: `${data.players}/${data.maxPlayers}`,
                inline: true
            }
        );

        const players = data.playersList || [];

        let playerText = players
            .slice(0, 32)
            .map(
                (player, index) =>
                    `${index + 1}. ${escapeMarkdown(player.name)}`
            )
            .join('\n');

        if (!playerText) {
            playerText = 'No players connected.';
        }

        embed.addFields({
            name: 'Connected Players',
            value: playerText.slice(0, 1024)
        });

        embed.setFooter({
            text: `Last update: ${new Date().toLocaleTimeString()}`
        });

    } else {

        embed.addFields(
            {
                name: 'Status',
                value: status,
                inline: true
            },
            {
                name: 'Address:Port',
                value: `\`${server.host}:${server.port}\``,
                inline: true
            },
            {
                name: 'Country',
                value: `🇺🇸 ${server.country}`,
                inline: true
            },
            {
                name: 'Game',
                value: 'Counter-Strike 1.6'
            },
            {
                name: 'Last Query Error',
                value: `\`${escapeMarkdown(data.error)}\``
            }
        );

        embed.setFooter({
            text: `Last update: ${new Date().toLocaleTimeString()}`
        });
    }

    return embed;
}

export function createServerButtons(server) {

    const buttons = [];

    if (server.joinUrl) {
        buttons.push(
            new ButtonBuilder()
                .setLabel('Join Server')
                .setEmoji('🎮')
                .setStyle(ButtonStyle.Link)
                .setURL(server.joinUrl)
        );
    }

    buttons.push(
        new ButtonBuilder()
            .setCustomId(`server_refresh_${server.id}`)
            .setLabel('Refresh')
            .setEmoji('🔄')
            .setStyle(ButtonStyle.Secondary)
    );

    if (server.gameTrackerUrl) {
        buttons.push(
            new ButtonBuilder()
                .setLabel('GameTracker')
                .setEmoji('🌐')
                .setStyle(ButtonStyle.Link)
                .setURL(server.gameTrackerUrl)
        );
    }

    return new ActionRowBuilder().addComponents(buttons);
}