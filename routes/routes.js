// Require dependencies
const fs = require('fs');
const router = require('express').Router();
const uuid = require('../helpers/uuid');

// GET route for for retrieving notes
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

// POST route for adding new note
router.post('/notes', (req, res) => {
    console.log('Updating notes!');
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

// DELETE route for deleting a note
router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        let notes = JSON.parse(data);

        // Filter out all notes that DON'T have the id to be deleted
        notes = notes.filter(note => (note.id !== req.params.id));

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Note deleted!');
                res.json(notes);
            }
        });

    });
})

module.exports = router;


