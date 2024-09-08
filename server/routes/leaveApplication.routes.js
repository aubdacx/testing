// leaveApplication.routes.js

const express = require('express');
const { validationResult } = require('express-validator');
const leaveController = require('../controllers/leaveApplication.controller'); // Adjust the path as needed
const leaveValidations = require('../validations/leaveApplication.validation'); // Import the validations

const router = express.Router();

// Middleware to handle validation errors
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

// Add a leave request
router.post(
  '/request-leave',
  leaveValidations.validateLeaveRequest,
  validateFields,
  leaveController.addLeaveRequest
);

// Fetch a leave request (includes PDS reference)
router.get(
  'leave-applications/:id',
  leaveController.getLeaveRequest
);

// Cancel a leave request
router.patch(
  '/cancel-leave/:id',
  leaveValidations.validateCancelLeave,
  validateFields,
  leaveController.cancelLeaveRequest
);

// Reject a leave request
router.patch(
  '/reject-leave/:id',
  leaveValidations.validateRejectLeave,
  validateFields,
  leaveController.rejectLeaveRequest
);

module.exports = router;
