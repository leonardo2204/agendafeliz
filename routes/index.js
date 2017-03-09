var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

const url = 'mongodb://admin:superUser@ds127260.mlab.com:27260/agendafeliz';

router.get('/contatos', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) next(err);
        db.collection('contatos').find().toArray(function(err, response) {
            if (err) next(err);
            res.json(response);
            db.close();
        })
    });
});

router.get('/contatos/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) next(err);

        db.collection('contatos').findOne({
            _id: new require('mongodb').ObjectID(req.params.id)
        }, function(err, response) {
            if (err) next(err);
            res.json(response);
            db.close();
        })
    });
});

router.put('/contatos/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) next(err);
        db.collection('contatos').findOneAndUpdate({
            _id: new require('mongodb').ObjectID(req.params.id)
        }, req.body, function(err, response) {
            if (err) next(err);
            res.end();
            db.close();
        })
    });
});

router.post('/contatos', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) next(err);
        db.collection('contatos').insertOne(req.body, function(err, r) {
            if (err) next(err);
            res.json(response);
            db.close();
        });
    });
});

router.delete('/contatos/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) next(err);
        db.collection('contatos').findOneAndDelete({
            _id: new require('mongodb').ObjectID(req.params.id)
        }, req.body, function(err, response) {
            if (err) next(err);
            res.end();
            db.close();
        })
    });
});

module.exports = router;
