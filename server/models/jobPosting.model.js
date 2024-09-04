const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  positionTitle: {
    type: String,
    required: true,
  },
  plantilliaItemNo: {
    type: Number,  
    required: true,
  },
  salaryJobGrade: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  qualificationStandards: {
    education: {
      type: String,
      required: true,
    },
    training: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    competency: {
      type: String,
      required: true,
    },
  },
  placeOfAssignment: {
    type: String,
    required: true,
  },
  isJobPostingOpen: {
    type: Boolean,
    required: true,
  },
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;