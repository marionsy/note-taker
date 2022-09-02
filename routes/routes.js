const fs = require('fs');
const path = require('path');
const router = require('express').Router();

router.get('/api/notes', (req, res) => {
    console.log('Retrieving notes!');
    fs.readFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json').then((data) => res.json(JSON.parse(data)));
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
    }
})



module.exports = router;


