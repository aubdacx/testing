const express = require('express');
const { validationResult } = require('express-validator');
const controllers = require('../controllers/PDS.controller'); // Adjust the path as needed
const validations = require('../validations/PDS.validation'); // Import the validations

const router = express.Router();

// Middleware to handle validation errors
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

// Routes for Personal Information
router.get('/personal-info/:id?', controllers.getPersonalInfo);
router.post('/personal-info', validations.validatePersonalInfo, validateFields, controllers.addPersonalInfo);
router.put('/personal-info/:id', validations.validatePersonalInfo, validateFields, controllers.editPersonalInfo);

// Routes for Family Background
router.get('/family-background/:id?', controllers.getFamilyBackground);
router.post('/family-background', validations.validateFamilyBackground, validateFields, controllers.addFamilyBackground);
router.put('/family-background/:id', validations.validateFamilyBackground, validateFields, controllers.editFamilyBackground);

// Routes for Educational Background
router.get('/educational-background/:id?', controllers.getEducationalBackground);
router.post('/educational-background', validations.validateEducationalBackground, validateFields, controllers.addEducationalBackground);
router.put('/educational-background/:id', validations.validateEducationalBackground, validateFields, controllers.editEducationalBackground);

// Routes for Work Experience
router.get('/work-experience/:id?', controllers.getWorkExperience);
router.post('/work-experience', validations.validateWorkExperience, validateFields, controllers.addWorkExperience);
router.put('/work-experience/:id', validations.validateWorkExperience, validateFields, controllers.editWorkExperience);

// Routes for Civil Service Eligibility
router.get('/civil-service-eligibility/:id?', controllers.getCivilServiceEligibility);
router.post('/civil-service-eligibility', validations.validateCivilServiceEligibility, validateFields, controllers.addCivilServiceEligibility);
router.put('/civil-service-eligibility/:id', validations.validateCivilServiceEligibility, validateFields, controllers.editCivilServiceEligibility);

// Routes for Voluntary Work
router.get('/voluntary-work/:id?', controllers.getVoluntaryWork);
router.post('/voluntary-work', validations.validateVoluntaryWork, validateFields, controllers.addVoluntaryWork);
router.put('/voluntary-work/:id', validations.validateVoluntaryWork, validateFields, controllers.editVoluntaryWork);

// Routes for Learning and Development
router.get('/learning-and-development/:id?', controllers.getLearningAndDevelopment);
router.post('/learning-and-development', validations.validateLearningAndDevelopment, validateFields, controllers.addLearningAndDevelopment);
router.put('/learning-and-development/:id', validations.validateLearningAndDevelopment, validateFields, controllers.editLearningAndDevelopment);

// Routes for Other Information
router.get('/other-information/:id?', controllers.getOtherInformation);
router.post('/other-information', validations.validateOtherInformation, validateFields, controllers.addOtherInformation);
router.put('/other-information/:id', validations.validateOtherInformation, validateFields, controllers.editOtherInformation);

// Routes for Relationships and Legal Info
router.get('/relationships-legal-info/:id?', controllers.getRelationshipsLegalInfo);
router.post('/relationships-legal-info', validations.validateRelationshipsLegalInfo, validateFields, controllers.addRelationshipsLegalInfo);
router.put('/relationships-legal-info/:id', validations.validateRelationshipsLegalInfo, validateFields, controllers.editRelationshipsLegalInfo);

// Routes for References
router.get('/references/:id?', controllers.getReferences);
router.post('/references', validations.validateReferences, validateFields, controllers.addReferences);
router.put('/references/:id', validations.validateReferences, validateFields, controllers.editReferences);

// Routes for Declaration
router.get('/declaration/:id?', controllers.getDeclaration);
router.post('/declaration', validations.validateDeclaration, validateFields, controllers.addDeclaration);
router.put('/declaration/:id', validations.validateDeclaration, validateFields, controllers.editDeclaration);

module.exports = router;
