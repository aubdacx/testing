const mongoose = require('mongoose');

// Define standard working hours using your preferred date format
const WORK_START_TIME = new Date('January 1, 2024 08:00:00');  // 8:00 AM
const WORK_END_TIME_AM = new Date('January 1, 2024 12:00:00');  // 12:00 PM
const WORK_START_TIME_PM = new Date('January 1, 2024 13:00:00');  // 1:00 PM
const WORK_END_TIME_PM = new Date('January 1, 2024 17:00:00');  // 5:00 PM

// Schema for each day's time-in/out record
const dailyRecordSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },   
    day: {
        type: Number,  // Day of the month (1-31)
        required: true
    },
    amIn: {
        type: Date
    },
    amOut: {
        type: Date
    },
    pmIn: {
        type: Date
    },
    pmOut: {
        type: Date
    }
});

// Schema for monthly time record
const monthlyTimeRecordSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    month: {
        type: Number,  // e.g., 1 for January, 2 for February
        required: true
    },
    year: {
        type: Number,  // e.g., 2024
        required: true
    },
    numOfDays: {
        type: Number,  // Number of days in the month (e.g., 28, 30, 31)
        required: true
    },
    lateMinutes: {
        type: Number,  // Total minutes late for the entire month
        default: 0
    },
    undertimeMinutes: {
        type: Number,  // Total minutes undertime for the entire month
        default: 0
    },
    records: [dailyRecordSchema]  // Array of daily time records
});

// Utility function to calculate the difference in minutes between two Date objects
function calculateMinutesDifference(startTime, endTime) {
    return Math.floor((endTime - startTime) / (1000 * 60));  // Convert milliseconds to minutes
}

// Pre-save hook to calculate total late and undertime minutes for the month
monthlyTimeRecordSchema.pre('save', function (next) {
    let totalLateMinutes = 0;
    let totalUndertimeMinutes = 0;

    this.records.forEach((record) => {
        // Calculate late minutes (if amIn is after 8:00 AM)
        if (record.amIn && record.amIn > WORK_START_TIME) {
            totalLateMinutes += calculateMinutesDifference(WORK_START_TIME, record.amIn);
        }

        // Calculate undertime minutes (if amOut is before 12:00 PM or pmOut is before 5:00 PM)
        if (record.amOut && record.amOut < WORK_END_TIME_AM) {
            totalUndertimeMinutes += calculateMinutesDifference(record.amOut, WORK_END_TIME_AM);
        }
        if (record.pmOut && record.pmOut < WORK_END_TIME_PM) {
            totalUndertimeMinutes += calculateMinutesDifference(record.pmOut, WORK_END_TIME_PM);
        }
    });

    // Store the calculated total late and undertime minutes at the monthly level
    this.lateMinutes = totalLateMinutes;
    this.undertimeMinutes = totalUndertimeMinutes;

    next();
});

module.exports = mongoose.model('MonthlyTimeRecord', monthlyTimeRecordSchema);