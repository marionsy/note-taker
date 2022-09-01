const fs = require('fs');
const path = require('path');
const app = require('express').Router();

app.get('/api/notes', (req, res) => {
    console.log('Retrieving notes!');
    fs.readFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json').then((data) => res.json(JSON.parse(data)));
    const { title, text, id } = req.body;
    if (title && text && id) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
    }
})

// GET route for returning notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET route for returning index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/index.html'))
);



module.exports = app;


