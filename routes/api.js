const path = require('path');
const fs = require('fs')

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });
    
    app.post('/api/notes', (req, res) => {
        let db = JSON.parse(fs.readFileSync('db/db.json'));
        res.json(db);
    
        let userNote = {
            title: req.body.title,
            text: req.body.text
        };
    
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });
};