// Require dependencies
const fs = require('fs');
const uuid = require('../helpers/uuid');

// Router
const router = require('express').Router();

// GET route for for reading db.json file and returning saved notes as JSON
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

// POST route for adding new note, saving it to request body, and returning note to user
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


