const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

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

    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    };

    db.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {
    const del = db.filter((data) => data.id !== req.params.id)

    fs.writeFileSync('./db/db.json', JSON.stringify(del))
    readFile.json(del)
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
