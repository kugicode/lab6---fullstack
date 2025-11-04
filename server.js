const express = require('express');

const app = express();

const PORT = 3000;

const lessons = [
    {id:1, name: 'Intro to html'},
    {id:2, name: 'Intro to javasccript'},
    {id:3, name: 'Intro to css'},
    {id:4, name: 'Intro to vuejs'},
    {id:5, name: 'Intro to react'},
    {id:6 , name: "Intro to Java"}
]

const myLogger = (req, res, next) => {
    console.log(`Incoming request ${req.url}`);
    next();
}

app.use(myLogger);
app.use('/images', express.static('img'));

app.get('/' , (req, res) => {
    res.send("Hello world");
});

app.get('/lessons', (req, res) => {
    res.json(lessons);
});

app.get('/new', (req, res) => {
    res.send("Another new page.");
})

app.get('/lessons/:id', (req, res) => {
    //get requested id! and turn it into number!
    const id = parseInt(req.params.id);

    const foundLesson = lessons.find(lesson => lesson.id === id);

        if(foundLesson){
            res.json(foundLesson)
        }
        else{
            res.status(404).send("No lessons found!");
        }
});


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    console.log();
});