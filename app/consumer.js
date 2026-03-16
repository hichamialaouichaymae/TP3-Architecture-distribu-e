const amqp = require('amqplib');

async function demarrerConsommateur() {
    try {
        const conn = await amqp.connect('amqp://admin:admin@rabbitmq');
        const channel = await conn.createChannel();
        const QUEUE = 'commandes';
        await channel.assertQueue(QUEUE, { durable: true });
        console.log('📦 Consommateur en attente de messages...');

        channel.consume(QUEUE, (msg) => {
            if (msg) {
                const commande = JSON.parse(msg.content.toString());
                console.log('--- NOUVELLE COMMANDE ---');
                console.log('Client:', commande.client);
                console.log('Produit:', commande.produit);
                channel.ack(msg);
            }
        });
    } catch (err) {
        setTimeout(demarrerConsommateur, 5000);
    }
}
demarrerConsommateur();