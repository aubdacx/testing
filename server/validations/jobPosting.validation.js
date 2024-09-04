// jobPostingValidation.js
const { body, validationResult } = require('express-validator');

const validateJobPosting = [
  body('no').isNumeric().withMessage('Job number must be a number'),
  body('positionTitle').isString().notEmpty().withMessage('Position title is required'),
  body('plantilliaItemNo').isNumeric().withMessage('Plantillia item number must be a number'),
  body('salaryJobGrade').isString().notEmpty().withMessage('Salary job grade is required'),
  body('monthlySalary').isNumeric().withMessage('Monthly salary must be a number'),
  body('qualificationStandards.education').isString().notEmpty().withMessage('Education qualification is required'),
  body('qualificationStandards.training').isString().notEmpty().withMessage('Training qualification is required'),
  body('qualificationStandards.experience').isString().notEmpty().withMessage('Experience qualification is required'),
  body('qualificationStandards.eligibility').isString().notEmpty().withMessage('Eligibility qualification is required'),
  body('qualificationStandards.competency').isString().notEmpty().withMessage('Competency qualification is required'),
  body('placeOfAssignment').isString().notEmpty().withMessage('Place of assignment is required'),
  body('isJobPostingOpen').isBoolean().withMessage('Job posting status must be a boolean'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateJobPosting;
