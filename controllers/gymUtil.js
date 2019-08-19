'use strict';

const accounts = require('./accounts.js');
const assessmentStore = require('../models/assessment-store.js');

const gymUtil = {
    getLastAssessment(request){
        if (assessmentStore.getUserAssessments(request).length > 0)
        {
            const recentAssessment = assessmentStore.getUserAssessments(request);
            return assessmentStore.getAssessment(recentAssessment[recentAssessment.length-1].id);
            //-1 in order to return the last element in the array
        }
    },

    calculateBMI(request){
        const loggedInUser = request;
        let weight;
        if (assessmentStore.getUserAssessments(request.id).length > 0)
        {
            weight = gymUtil.getLastAssessment(request.id).weight;
        }
        else
            {
            weight = Number(loggedInUser.startingWeight);
        }
        const BMI = weight/(loggedInUser.height*loggedInUser.height);
        return BMI;
    },


    determineBMICategory(BMI) {

        if (BMI <= 15.99)
            return "Severely Underweight";
        else if (BMI <= 18.5)
            return "Underweight";
        else if (BMI <= 25)
            return "Normal";
        else if (BMI <= 30)
            return "Overweight";
        else if (BMI <= 34.99)
            return "Moderately Obese";
        else if (BMI > 35)
            return "Severely Obese";

        else return "BMI Category cannot be calculated";
    },

    isIdealBodyWeight(request){
        const loggedInUser = request;
        let weight;
        if (assessmentStore.getUserAssessments(request.id).length > 0)
        {
            weight = gymUtil.getLastAssessment(request.id).weight;
        }
        else
        {
            weight = Number(loggedInUser.startingWeight);
        }
            if (loggedInUser.gender.equals==="M") {
                if(loggedInUser.height < 1.524)//devine formula - 1.524 = 5 foot
                {
                    if(weight>= 48 && weight<= 52)
                    {
                        return true;
                    }
                    else return false;
            }



            else if (weight-2 > 50 +(2.3*((loggedInUser.height-1.524)/0.0254))) //devine formula
            {
                return false;
            }
                else if (weight+2 < 50 +(2.3*((loggedInUser.height-1.524)/0.0254))) //devine formula
                {
                    return false;
                }
                else return true;
        }
            else //if user is Female
                {
                    if(loggedInUser.height < 1.524)//devine formula - 1.524 = 5 foot
                    {
                        if(weight>= 43.5 && weight<= 45.5)
                        {
                            return true;
                        }
                        else return false;
                    }

                    else if (weight-2 > 49 +(2.3*((loggedInUser.height-1.524)/0.0254)))//devine formula
                    {
                        return false;
                    }
                    else if (weight+2 < 49 +(2.3*((loggedInUser.height-1.524)/0.0254))) //devine formula
                    {
                        return false;
                    }
                    else return true;


            }

    }
};
module.exports = gymUtil;