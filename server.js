// Require dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/routes.js');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET route for returning notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET route for returning index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// Initiates server listening
app.listen(PORT, () =>
    console.log(`App listening on PORT: ${PORT}`)
);