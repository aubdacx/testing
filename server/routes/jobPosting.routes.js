// jobPostingRoutes.js
const express = require('express');
const router = express.Router();
const { addJobPosting, editJobPosting, setJobPostingStatus } = require('../controllers/jobPosting.controller');
const validateJobPosting = require('../validations/jobPosting.validation'); // Adjust the path as needed

// Route to add a job posting
router.post('/add', validateJobPosting, addJobPosting);

// Route to edit a job posting
router.put('/edit/:id', validateJobPosting, editJobPosting);

// Route to set job posting status
router.patch('/status/:id', setJobPostingStatus);

module.exports = router;
