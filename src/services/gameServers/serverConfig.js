module.exports = {
    servers: [
        {
            id: 'zombie_plague',
            name: 'Zombie Plague',
            ip: '74.91.113.180',
            port: 27015,
            type: 'css', // نوع اللعبة لـ gamedig
            emoji: '🧟'
        },
        {
            id: 'zombie_escape',
            name: 'Zombie Escape',
            ip: '74.91.113.180',
            port: 27021,
            type: 'css',
            emoji: '🏃'
        }
    ],
    updateInterval: 300000, // 5 دقائق
    maxPlayersDisplay: 20,
    embedColorOnline: 0x00FF00,
    embedColorOffline: 0xFF0000
};
