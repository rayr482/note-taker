const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(db);

    let note = {
        title: req.body.title,
        text: req.body.text
    };

    db.push(note);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
