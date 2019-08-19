"use strict";

const logger = require("../utils/logger");
const assessmentStore = require('../models/assessment-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const gymUtil = require('./gymUtil.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const BMI = gymUtil.calculateBMI(loggedInUser).toFixed(2);

    const viewData = {
      title: "GymApp Dashboard",
      name: loggedInUser.firstName + " " + loggedInUser.lastName,
      bmi: BMI,
      bmiCategory: gymUtil.determineBMICategory(BMI),
      idealBodyWeight : gymUtil.isIdealBodyWeight(loggedInUser),
      userAssessment: assessmentStore.getUserAssessments(loggedInUser.id).reverse(),

    };
    response.render("dashboard", viewData);
  },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      userId: loggedInUser.id,
      id: uuid(),
      date: request.body.date,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },


};

module.exports = dashboard;
