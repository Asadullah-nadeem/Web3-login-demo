require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', authRoutes);

const PORT = process.env.PORT;
const URL = process.env.URL;

app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Error starting server:', err);
        return;
    }
    console.log(`✅ Server running at ${URL}:${PORT}`);
});
