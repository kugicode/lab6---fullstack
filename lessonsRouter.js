const express = require('express');

const router = express.Router();

router.use(express.json());

let nextId = 7;

const lessons = [
    {id: 1, name: 'Intro to html', space: 5},
    {id: 2, name: 'Intro to javasccript', space: 5},
    {id: 3, name: 'Intro to css', space: 5},
    {id: 4, name: 'Intro to vuejs', space: 5},
    {id: 5, name: 'Intro to react', space: 5},
    {id: 6 , name: "Intro to Java", space: 5}
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

router.post('/', (req, res) => {
    const newId = nextId++;

    const newLesson = {
        "id": newId,
        "topic": "REST API", 
        "location": "Brighton", 
        "price": "300", 
        "space": 100
    }
    lessons.push(newLesson);

    res.json({id: newId});

});

// PUT /api/lessons/:id (Element 6: Update lesson space)
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    const foundLesson = lessons.find(lesson => lesson.id === id);

    if(foundLesson){
        const currentSpace = foundLesson.space || 1;
        foundLesson.space = currentSpace * 2;

         res.json({"msg": "success"});
    }
    else{
        next();
    }
});

module.exports = router;