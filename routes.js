"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts = require('./controllers/accounts.js');
const trainer = require('./controllers/trainer.js');


router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/trainerDashboard", trainer.index);
router.get("/trainerDashboard/:id", trainer.viewUser);


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


router.post("/dashboard/addassessment", dashboard.addAssessment);
router.post("/viewUser/:user/addcomment/:id", trainer.addComment);

module.exports = router;
