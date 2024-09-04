// jobPostingRoutes.js
const express = require('express');
const router = express.Router();
const { addJobPosting, editJobPosting, setJobPostingStatus ,fetchJobPostings } = require('../controllers/jobPosting.controller');
const validateJobPosting = require('../validations/jobPosting.validation'); // Adjust the path as needed

router.post('/add', validateJobPosting, addJobPosting);
router.put('/edit/:id', validateJobPosting, editJobPosting);
router.patch('/status/:id', setJobPostingStatus);
router.get('/fetch', fetchJobPostings);

module.exports = router;
