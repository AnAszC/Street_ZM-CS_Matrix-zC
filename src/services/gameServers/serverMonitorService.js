const { fetchServerInfo } = require('./gameQueryService');
const { buildServerEmbed } = require('./serverEmbed');
const { servers, updateInterval } = require('./serverConfig');

class ServerMonitorService {
    constructor(client) {
        this.client = client;
        this.messages = new Map(); // تخزين معرفات الرسائل للتحديث
        this.startMonitoring();
    }

    startMonitoring() {
        setInterval(async () => {
            for (const server of servers) {
                const data = await fetchServerInfo(server);
                const embed = buildServerEmbed(server.id, data);
                
                // تحديث الرسائل المخزنة
                this.updateServerMessage(server.id, embed);
            }
        }, updateInterval);
    }

    async updateServerMessage(serverId, embed) {
        // هنا يمكنك تحديث رسالة محددة في قناة معينة
        // مثلاً: 
        // const channel = await this.client.channels.fetch('ID_القناة');
        // const message = await channel.messages.fetch(this.messages.get(serverId));
        // await message.edit({ embeds: [embed] });
    }

    async sendInitialMessages(channelId) {
        const channel = await this.client.channels.fetch(channelId);
        
        for (const server of servers) {
            const data = await fetchServerInfo(server);
            const embed = buildServerEmbed(server.id, data);
            const message = await channel.send({ embeds: [embed] });
            this.messages.set(server.id, message.id);
        }
    }
}

module.exports = ServerMonitorService;
