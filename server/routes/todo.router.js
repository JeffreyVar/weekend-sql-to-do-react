const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

router.get('/', (req, res) => {
    console.log("In GET request");
    let queryText = 'SELECT * FROM list ORDER BY id, id ASC;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

// POST

router.post('/', (req, res) => {
    console.log('POST req.body', req.body);
    let queryText = 'INSERT INTO "list" ("task") VALUES ($1);'
    pool.query(queryText, [req.body.task])
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// PUT

router.put('/complete/:id', (req,res) => {
    let {id} = req.params;
    // Switches between true and false
    const sqlText = `UPDATE "list" SET "complete" = NOT "complete"
    WHERE "id" = $1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

// Handles reset on the server side
router.put('/reset', (req,res) => {
    let {complete} = req.body;
    console.log(req.body);
    const sqlText = `UPDATE "list" SET "complete" = $1`;
    pool.query(sqlText, [complete])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error making query ${sqlText}`, err);
            res.sendStatus(500);
        });
});

// DELETE

router.delete('/:id', (req,res) => {
    let {id} = req.params;
    let sqlText = `DELETE FROM "list" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${sqlText}`, err);
        res.sendStatus(500);
    });
});

module.exports = router;
