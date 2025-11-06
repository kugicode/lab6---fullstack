const express = require('express');

const app = express();

const PORT = 3000;

// --- 1. Import the Router Module (Crucial for Task 2) ---
const lessonsRouter = require('./lessonsRouter'); 


// --- Global Middleware: Logger (Task 1) ---
const myLogger = (req, res, next) => {
    console.log(`Incoming request ${req.url}`);
    next();
}

app.use(myLogger);
app.use('/images', express.static('images')); // Static File Middleware (serve from images/ folder)


// --- 2. Mount the Router under the /api/lessons path! (Task 2) ---
// Requests to /api/lessons/* go into the lessonsRouter file.
app.use('/api/lessons', lessonsRouter); 


// --- 3. The Final Error Middleware (Catch-all 404) ---
app.use((req, res, next) => {
    // This catches requests that didn't match any route above (including in the router).
    res.status(404).send("Resource not found.");
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    console.log("Modular API routes ready at /api/lessons");
});