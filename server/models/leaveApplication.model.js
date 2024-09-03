const mongoose = require('mongoose');

// Personal Information Schema
const PersonalInfoSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    officeOrDepartment: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    dateOfFiling: { type: Date, required: true }
  });
  
  // Leave Details Schema
  const LeaveDetailsSchema = new mongoose.Schema({
    typeOfLeave: {
      type: String,
      enum: [
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
      ],
      required: true
    },
    detailsOfLeave: {
      vacationLeave: {
        location: {
          type: String,
          enum: ['Within the Philippines', 'Abroad'],
          required: function() {
            return this.typeOfLeave === 'Vacation Leave';
          }
        },
        locationDetails: {
          type: String,
          required: function() {
            return this.detailsOfLeave && this.detailsOfLeave.vacationLeave.location === 'Abroad';
          }
        }
      },
      sickLeave: {
        treatmentType: {
          type: String,
          enum: ['In Hospital', 'Outpatient'],
          required: function() {
            return this.typeOfLeave === 'Sick Leave';
          }
        },
        illnessDetails: {
          type: String,
          required: function() {
            return this.typeOfLeave === 'Sick Leave';
          }
        }
      },
      studyLeave: {
        purpose: {
          type: String,
          enum: ['Completion of Master\'s Degree', 'Bar/Board Exam Review', 'Others'],
          required: function() {
            return this.typeOfLeave === 'Study Leave';
          }
        },
        otherPurposeDetails: {
          type: String,
          required: function() {
            return this.detailsOfLeave && this.detailsOfLeave.studyLeave.purpose === 'Others';
          }
        }
      },
      otherPurpose: {
        description: {
          type: String,
          required: function() {
            return this.typeOfLeave === 'Others';
          }
        }
      }
    }
  });
  
  // Action on Application Schema
  const ActionOnApplicationSchema = new mongoose.Schema({
    numberOfWorkingDays: { type: Number, required: true },
    inclusiveDates: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true }
    },
    commutation: {
      requested: { type: Boolean, required: true },
      applicantSignature: { type: String, required: true }
    },
    leaveCredits: {
      asOfDate: { type: Date, required: true },
      totalEarned: {
        vacationLeave: { type: Number, required: true },
        sickLeave: { type: Number, required: true }
      },
      lessThisApplication: {
        vacationLeave: { type: Number, required: true },
        sickLeave: { type: Number, required: true }
      },
      balance: {
        vacationLeave: { type: Number, required: true },
        sickLeave: { type: Number, required: true }
      }
    },
    recommendation: {
      status: { type: String, enum: ['For Approval', 'For Disapproval'], required: true },
      reason: { type: String } // If disapproved
    },
    finalDecision: {
      approvedDays: {
        withPay: { type: Number },
        withoutPay: { type: Number },
        others: { type: String }
      },
      disapprovalReason: { type: String }
    }
  });
  
  // Main Leave Application Schema
  const LeaveApplicationSchema = new mongoose.Schema({
    personalInfo: PersonalInfoSchema,
    leaveDetails: LeaveDetailsSchema,
    actionOnApplication: ActionOnApplicationSchema
  });
  
  module.exports = mongoose.model('LeaveApplication', LeaveApplicationSchema);
  