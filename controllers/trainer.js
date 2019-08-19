"use strict";

const logger = require("../utils/logger");
const assessmentStore = require('../models/assessment-store.js');
const userStore = require('../models/user-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const gymUtil = require('./gymUtil.js');

const trainer = {

        index(request, response) {
            logger.info("trainerDashboard rendering");
            const loggedInUser = accounts.getCurrentUser(request);
            const viewData = {
                title: "GymApp Trainer Dashboard",
                name: loggedInUser.firstName + " " + loggedInUser.lastName,

                allUsers: userStore.getAllUsers(),
            };
            response.render("trainerDashboard", viewData);
        },

        viewUser(request, response){
            const currentUser = userStore.getUserById(request.params.id);
            const BMI = gymUtil.calculateBMI(currentUser).toFixed(2);
            const viewData = {
                title: "GymApp Dashboard",
                name: currentUser.firstName + " " + currentUser.lastName,
                bmi: BMI,
                bmiCategory: gymUtil.determineBMICategory(BMI),
                idealBodyWeight : gymUtil.isIdealBodyWeight(currentUser),
                user: request.params.id,
                userAssessment: assessmentStore.getUserAssessments(currentUser.id).reverse(),
            };
            response.render("viewUser", viewData);
        },

        addComment(request, response) {
            const currentAssessment = assessmentStore.getAssessment(request.params.id);
            currentAssessment.comment = request.body.comment;
            assessmentStore.save();
            response.redirect("/trainerDashboard/" + request.params.user);
        }
};
module.exports = trainer;