const express = require('express');
const { connectMongo } = require('./services/mongodb');
const { connectRabbitMQ } = require('./services/rabbitmq');
const commandesRoutes = require('./routes/commandes');

const app = express();
const PORT = process.env.PORT || 3001;
const INSTANCE = process.env.INSTANCE || 'Instance-?';

app.use(express.json());
app.use('/commandes', commandesRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', instance: INSTANCE });
});

async function start() {
    await connectMongo();
    await connectRabbitMQ();
    app.listen(PORT, () => {
        console.log(`${INSTANCE} lancée sur le port ${PORT}`);
    });
}
start();