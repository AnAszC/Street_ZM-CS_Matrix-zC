import { GameDig } from 'gamedig';

export async function queryGameServer(server) {
    try {
        const state = await GameDig.query({
            type: server.game,
            host: server.host,
            port: server.port,

            socketTimeout: 3000,
            attemptTimeout: 5000,
            maxAttempts: 1
        });

        return {
            online: true,

            name: state.name || server.name,

            map: state.map || 'Unknown',

            players: state.players?.length ?? 0,

            maxPlayers: state.maxplayers ?? 0,

            playersList: (state.players || []).map(player => ({
                name: player.name || 'Unknown',
                score: player.raw?.score ?? player.score ?? 0,
                time: player.raw?.time ?? player.time ?? 0
            })),

            game: state.raw?.game || state.name || 'Counter-Strike 1.6',

            version: state.version || '',

            ping: state.ping ?? 0,

            country: server.country,

            host: server.host,

            port: server.port,

            joinUrl: server.joinUrl,

            gameTrackerUrl: server.gameTrackerUrl,

            error: null
        };

    } catch (error) {

        return {
            online: false,

            name: server.name,

            map: null,

            players: 0,

            maxPlayers: 0,

            playersList: [],

            game: 'Counter-Strike 1.6',

            version: '',

            ping: null,

            country: server.country,

            host: server.host,

            port: server.port,

            joinUrl: server.joinUrl,

            gameTrackerUrl: server.gameTrackerUrl,

            error: error?.message || 'Unknown query error'
        };
    }
}