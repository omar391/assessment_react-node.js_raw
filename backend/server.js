require('dotenv').config();
const { connectDB } = require('./config/db.js');
const { createApp } = require('./app.js');

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB();
        const app = createApp();
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();