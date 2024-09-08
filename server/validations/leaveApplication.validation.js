// leaveApplication.validation.js

const { body, param, check } = require('express-validator');

// Validate leave request data
const validateLeaveRequest = [
  body('leaveDetails.typeOfLeave')
    .isString()
    .withMessage('Type of leave must be a string.')
    .notEmpty()
    .withMessage('Type of leave is required.')
    .isIn([
      'Vacation Leave',
      'Mandatory/Force Leave',
      'Sick Leave',
      'Maternity Leave',
      'Paternity Leave',
      'Special Privilege Leave',
      'Solo Parent Leave',
      'Study Leave',
      '10-day VAWC Leave',
      'Rehabilitation Privilege',
      'Special Leave Benefits for Women',
      'Special Emergency (Calamity) Leave',
      'Adoption Leave',
      'Others'
    ])
    .withMessage('Invalid type of leave.'),

  body('leaveDetails.detailsOfLeave')
    .custom((value, { req }) => {
      const typeOfLeave = req.body.leaveDetails.typeOfLeave;
      if (typeOfLeave === 'Vacation Leave' && (!value.location || (value.location === 'Abroad' && !value.locationDetails))) {
        throw new Error('Location and location details are required for vacation leave.');
      }
      if (typeOfLeave === 'Sick Leave' && (!value.treatmentType || !value.illnessDetails)) {
        throw new Error('Treatment type and illness details are required for sick leave.');
      }
      if (typeOfLeave === 'Study Leave' && (!value.purpose || (value.purpose === 'Others' && !value.otherPurposeDetails))) {
        throw new Error('Purpose and other purpose details are required for study leave.');
      }
      if (typeOfLeave === 'Others' && !value.description) {
        throw new Error('Description is required for other types of leave.');
      }
      return true;
    }),

  body('actionOnApplication.numberOfWorkingDays')
    .isInt({ min: 1 })
    .withMessage('Number of working days must be a positive integer.'),
  
  body('actionOnApplication.inclusiveDates.startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date.'),
  
  body('actionOnApplication.inclusiveDates.endDate')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date.'),
  
  body('actionOnApplication.commutation.requested')
    .isBoolean()
    .withMessage('Commutation requested must be a boolean value.'),
  
  body('actionOnApplication.commutation.applicantSignature')
    .isString()
    .withMessage('Applicant signature must be a string.')
    .notEmpty()
    .withMessage('Applicant signature is required.'),
  
  body('actionOnApplication.leaveCredits.asOfDate')
    .isISO8601()
    .withMessage('As of date must be a valid ISO 8601 date.'),
  
  body('actionOnApplication.leaveCredits.totalEarned')
    .isObject()
    .withMessage('Total earned must be an object.'),
  
  body('actionOnApplication.leaveCredits.lessThisApplication')
    .isObject()
    .withMessage('Less this application must be an object.'),
  
  body('actionOnApplication.leaveCredits.balance')
    .isObject()
    .withMessage('Balance must be an object.'),
  
  body('actionOnApplication.recommendation.status')
    .isString()
    .withMessage('Recommendation status must be a string.')
    .isIn(['For Approval', 'For Disapproval'])
    .withMessage('Invalid recommendation status.'),
  
  body('actionOnApplication.finalDecision')
    .optional()
    .isObject()
    .withMessage('Final decision must be an object if provided.')
];

// Validate leave request ID for cancellation and rejection
const validateRequestId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid leave request ID.')
];

// Validate leave request cancellation data
const validateCancelLeave = [
  ...validateRequestId
];

// Validate leave request rejection data
const validateRejectLeave = [
  ...validateRequestId,
  body('reason')
    .isString()
    .withMessage('Rejection reason must be a string.')
    .notEmpty()
    .withMessage('Rejection reason is required.')
];

module.exports = {
  validateLeaveRequest,
  validateCancelLeave,
  validateRejectLeave
};
