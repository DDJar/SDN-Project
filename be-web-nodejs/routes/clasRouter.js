const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Class = require('../models/class')
var authenticate = require('../authenticate');
const classRouter = express.Router();
const cors = require('./cors');
classRouter.use(bodyParser.json());
//task2 ass3
classRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Class.find({})
            .then((Class) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Class);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions ,(req, res, next) => {
        Class.create(req.body)
            .then((classlist) => {
                console.log('Classlist Created', classlist);
                res.statusCode = 200; res.setHeader('Content-Type', 'application/json');
                res.json(classlist);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Class');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Class.deleteMany({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

/// Create, Read, Delete => dish by Id
classRouter.route('/:classId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Class.findById(req.params.classId)
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Class/' + req.params.classId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Class.findByIdAndUpdate(req.params.classId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Class.findByIdAndDelete(req.params.classId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = classRouter;