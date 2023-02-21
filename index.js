const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/dbConfig');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes
//create (questions, userresponses, chatgptpassages)
app.post('/api/v1/questions', async (req, res) => {
    try {
        const { question } = req.body;
        const newQuestion = await db.query('INSERT INTO questions ("question", "createdAt", "updatedAt") VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', 
        [question]);

        res.json(newQuestion[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/v1/userresponses', async (req, res) => {
    try {
        const { response } = req.body;
        const newResponse = await db.query('INSERT INTO userresponses ("response","createdAt", "updatedAt") VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', 
        [response]);
        res.json(newResponse[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.post('/api/v1/chatgptpassages', async (req, res) => {
    try {
        const { passage } = req.body;
        const newPassage = await db.query('INSERT INTO chatgptpassages ("passage","createdAt", "updatedAt") VALUES($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', 
        [passage]);
        res.json(newPassage[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all (questions, userresponses, chatgptpassages)
app.get('/api/v1/questions', async (req, res) => {
    try {
        const allQuestions = await db.query('SELECT * FROM questions');
        console.log(allQuestions)
        res.json(allQuestions);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/api/v1/userresponses', async (req, res) => {
    try {
        const allResponses = await db.query('SELECT * FROM userresponses');
        res.json(allResponses);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/api/v1/chatgptpassages', async (req, res) => {
    try {
        const allPassages = await db.query('SELECT * FROM chatgptpassages');
        res.json(allPassages);
    } catch (err) {
        console.error(err.message);
    }
});

//get one (questions, userresponses, chatgptpassages)
app.get('/api/v1/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const question = await db.query('SELECT * FROM questions WHERE "id" = $1', [id]);
        res.json(question[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/api/v1/userresponses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await db.query('SELECT * FROM userresponses WHERE "id" = $1', [id]);
        res.json(response[0]);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/api/v1/chatgptpassages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const passage = await db.query('SELECT * FROM chatgptpassages WHERE "id" = $1', [id]);
        res.json(passage[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update (questions, userresponses, chatgptpassages)
app.put('/api/v1/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { question } = req.body;
        const updateQuestion = await db.query('UPDATE questions SET "question" = $1 WHERE "id" = $2',
        [question, id]);
        res.json('REVISION MADE!');
    } catch (err) {
        console.error(err.message);
    }
});
app.put('/api/v1/userresponses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { response } = req.body;
        const updateResponse = await db.query('UPDATE userresponses SET "response" = $1 WHERE "id" = $2',
        [response, id]);
        res.json('REVISION MADE!');
    } catch (err) {
        console.error(err.message);
    }
});
app.put('/api/v1/chatgptpassages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { passage } = req.body;
        const updatePassage = await db.query('UPDATE chatgptpassages SET "passage" = $1 WHERE "id" = $2',
        [passage, id]);
        res.json('REVISION MADE!');
    } catch (err) {
        console.error(err.message);
    }
});

//delete (questions, userresponses, chatgptpassages)
app.delete('/api/v1/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteQuestion = await db.query('DELETE FROM questions WHERE "id" = $1', [id]);
        res.json('QUESTION DELETED!');
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/api/v1/userresponses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResponse = await db.query('DELETE FROM userresponses WHERE "id" = $1', [id]);
        res.json('RESPONSE DELETED!');
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/api/v1/chatgptpassages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePassage = await db.query('DELETE FROM chatgptpassages WHERE "id" = $1', [id]);
        res.json('PASSAGE DELETED!');
    } catch (err) {
        console.error(err.message);
    }
});

// 404 Page
app.get("*", (req, res) => {
    res.status(404).send("Side eyes. 404. This page does not exist.");
  });

  // Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
