// jobPostingController.js
const JobPosting = require("../models/jobPosting.model"); // Adjust the path as needed

// Add a new job posting
const addJobPosting = async (req, res) => {
  try {
    const jobPosting = new JobPosting(req.body);
    await jobPosting.save();
    res
      .status(201)
      .json({ message: "Job posting added successfully", jobPosting });
  } catch (error) {
    res.status(400).json({ message: "Error adding job posting", error });
  }
};
const fetchJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find(); // Fetches all job postings from the database
    res.status(200).json(jobPostings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job postings", error });
  }
};

// Edit an existing job posting
const editJobPosting = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJobPosting = await JobPosting.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    res.json({
      message: "Job posting updated successfully",
      updatedJobPosting,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating job posting", error });
  }
};

// Set job posting status to open or closed
const setJobPostingStatus = async (req, res) => {
  const { id } = req.params;
  const { isJobPostingOpen } = req.body; // expecting a boolean value for isJobPostingOpen (true = open, false = closed)

  try {
    const jobPosting = await JobPosting.findById(id);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    jobPosting.isJobPostingOpen = isJobPostingOpen;
    await jobPosting.save();
    res.json({
      message: `Job posting status set to ${
        isJobPostingOpen ? "open" : "closed"
      }`,
      jobPosting,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating job posting status", error });
  }
};
module.exports = {
  addJobPosting,
  editJobPosting,
  setJobPostingStatus,
  fetchJobPostings, // Exporting fetch function
};
