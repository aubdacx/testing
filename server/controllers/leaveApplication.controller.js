// leaveApplication.controller.js

const LeaveApplication = require('../models/leaveApplication.model'); // Adjust path as necessary
const PDS = require('../models/PDS.model'); // Ensure the path is correct

// Add a leave request
exports.addLeaveRequest = async (req, res) => {
  try {
    const employeeId = req.user.id; // Assuming employee's ID is available from authentication middleware
    const pds = await PDS.findOne({ employeeId });

    if (!pds) {
      return res.status(404).json({ message: 'Personal Data Sheet not found.' });
    }

    const leaveRequest = new LeaveApplication({
      leaveDetails: req.body.leaveDetails,
      actionOnApplication: req.body.actionOnApplication,
      pdsReference: pds._id, // Link to PDS
      status: 'Pending'
    });

    await leaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully.', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting leave request.', error: error.message });
  }
};

// Fetch Leave Request including personal info from PDS
exports.getLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveApplication.findById(req.params.id).populate('pdsReference');

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    res.status(200).json({ leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave request.', error: error.message });
  }
};

// Cancel a leave request (Update status instead of deleting)
exports.cancelLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveApplication.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    leaveRequest.status = 'Cancelled'; // Update status
    await leaveRequest.save();
    res.status(200).json({ message: 'Leave request canceled successfully.', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling leave request.', error: error.message });
  }
};

// Reject a leave request (Update status and provide rejection reason)
exports.rejectLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveApplication.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    leaveRequest.status = 'Rejected';
    leaveRequest.actionOnApplication.finalDecision.disapprovalReason = req.body.reason;
    await leaveRequest.save();

    res.status(200).json({ message: 'Leave request rejected successfully.', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting leave request.', error: error.message });
  }
};
