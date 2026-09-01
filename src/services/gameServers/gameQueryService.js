const { query } = require('gamedig');

async function fetchServerInfo(serverConfig) {
    try {
        const info = await query({
            type: serverConfig.type || 'css',
            host: serverConfig.ip,
            port: serverConfig.port
        });

        return {
            online: true,
            name: info.name,
            map: info.map,
            players: info.players.length,
            maxPlayers: info.maxplayers,
            playerList: info.players.map(p => p.name).slice(0, 20)
        };
    } catch (error) {
        return {
            online: false,
            name: serverConfig.name,
            map: 'غير متاح',
            players: 0,
            maxPlayers: 0,
            playerList: []
        };
    }
}

module.exports = { fetchServerInfo };
