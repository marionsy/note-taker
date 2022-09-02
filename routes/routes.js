const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const uuid = require('../helpers/uuid');

router.get('/notes', (req, res) => {
    console.log('Retrieving notes!');
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(JSON.parse(data));
        }
    })
});

router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let notes = JSON.parse(data);

        const { title, text } = req.body;
        if (req.body) {
            const newNote = {
                title,
                text,
                id: uuid(),
            };
            notes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(notes);
                }
            });
        }
    });
});



module.exports = router;


