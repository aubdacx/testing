const { body } = require('express-validator');

// Personal Info Validation
const validatePersonalInfo = [
  body('surname').notEmpty().withMessage('Surname is required.'),
  body('firstName').notEmpty().withMessage('First name is required.'),
  body('middleName').notEmpty().withMessage('Middle name is required.'),
  body('dateOfBirth').isDate().withMessage('Date of Birth must be a valid date.'),
  body('placeOfBirth').notEmpty().withMessage('Place of Birth is required.'),
  body('sex').isIn(['Male', 'Female']).withMessage('Sex must be either Male or Female.'),
  body('citizenship').notEmpty().withMessage('Citizenship is required.'),
];

// Family Background Validation
const validateFamilyBackground = [
  body('spouse.surname').optional().isString().withMessage('Spouse surname must be a string.'),
  body('children.*.name').optional().isString().withMessage('Child name must be a string.'),
  body('children.*.dateOfBirth').optional().isDate().withMessage('Child date of birth must be a valid date.'),
];

// Educational Background Validation
const validateEducationalBackground = [
  body('level').isIn(['Elementary', 'Secondary', 'Vocational/Trade Course', 'College', 'Graduate Studies'])
    .withMessage('Invalid education level.'),
  body('schoolName').notEmpty().withMessage('School name is required.'),
  body('periodOfAttendance.from').optional().isDate().withMessage('Invalid start date.'),
  body('periodOfAttendance.to').optional().isDate().withMessage('Invalid end date.'),
];

// Work Experience Validation
const validateWorkExperience = [
  body('duration.from').isDate().withMessage('Start date is required and must be valid.'),
  body('position').notEmpty().withMessage('Position is required.'),
  body('monthlySalary').optional().isNumeric().withMessage('Monthly salary must be a number.'),
];

// Civil Service Eligibility Validation
const validateCivilServiceEligibility = [
  body('careerService').notEmpty().withMessage('Career Service is required.'),
  body('dateOfExamination').optional().isDate().withMessage('Invalid date of examination.'),
];

// Voluntary Work Validation
const validateVoluntaryWork = [
  body('organizationName').notEmpty().withMessage('Organization name is required.'),
  body('duration.from').isDate().withMessage('Start date is required.'),
  body('duration.to').isDate().withMessage('End date is required.'),
];

// Learning and Development Validation
const validateLearningAndDevelopment = [
  body('title').notEmpty().withMessage('Title is required.'),
  body('duration.from').isDate().withMessage('Start date is required.'),
  body('duration.to').isDate().withMessage('End date is required.'),
];

// Other Information Validation
const validateOtherInformation = [
  body('specialSkillsAndHobbies').isArray().withMessage('Special skills and hobbies must be an array.'),
  body('nonAcademicDistinctions').isArray().withMessage('Non-academic distinctions must be an array.'),
];

// Relationships and Legal Info Validation
const validateRelationshipsLegalInfo = [
  body('relatedToAuthority.thirdDegree').optional().isBoolean().withMessage('Must be a boolean.'),
  body('administrativeOffense.foundGuilty').optional().isBoolean().withMessage('Must be a boolean.'),
];

// References Validation
const validateReferences = [
  body('name').notEmpty().withMessage('Reference name is required.'),
];

// Declaration Validation
const validateDeclaration = [
  body('declarationStatement').optional().isString().withMessage('Declaration statement must be a string.'),
];

// Export all validations
module.exports = {
  validatePersonalInfo,
  validateFamilyBackground,
  validateEducationalBackground,
  validateWorkExperience,
  validateCivilServiceEligibility,
  validateVoluntaryWork,
  validateLearningAndDevelopment,
  validateOtherInformation,
  validateRelationshipsLegalInfo,
  validateReferences,
  validateDeclaration,
};
