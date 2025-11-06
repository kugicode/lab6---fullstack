const express = require('express');

const router = express.Router();


const lessons = [
    {id: 1, name: 'Intro to html'},
    {id: 2, name: 'Intro to javasccript'},
    {id: 3, name: 'Intro to css'},
    {id: 4, name: 'Intro to vuejs'},
    {id: 5, name: 'Intro to react'},
    {id: 6 , name: "Intro to Java"}
];
// Note: this router is mounted at /api/lessons in server.js
router.get('/' , (req, res) => {
    res.send("Hello from lessons router");
});

// List all lessons -> mounted path: /api/lessons/
router.get('/all', (req, res) => {
    res.json(lessons);
});

router.get('/new', (req, res) => {
    res.send("Another new page.");
});

// Get lesson by id -> mounted path: /api/lessons/:id
router.get('/:id', (req, res, next) => {
    // get requested id and turn it into number
    const id = parseInt(req.params.id, 10);

    const foundLesson = lessons.find(lesson => lesson.id === id);

    if(foundLesson){
        res.json(foundLesson);
    } else {
        // pass to next middleware (likely the 404 handler in server)
        next();
    }
});

module.exports = router;