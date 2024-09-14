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

// Middleware to ensure personId is available in the session
const ensurePersonIdInSession = (req, res, next) => {
  if (!req.session || !req.session.personId) {
    return res.status(400).json({ error: 'Missing personal info ID in session' });
  }
  next();
};

// Validation-only routes
router.post('/validate/personal-info', validations.validatePersonalInfo, validateFields);
router.post('/validate/family-background', validations.validateFamilyBackground, validateFields);
router.post('/validate/educational-background', validations.validateEducationalBackground, validateFields);
router.post('/validate/work-experience', validations.validateWorkExperience, validateFields);
router.post('/validate/civil-service-eligibility', validations.validateCivilServiceEligibility, validateFields);
router.post('/validate/voluntary-work', validations.validateVoluntaryWork, validateFields);
router.post('/validate/learning-and-development', validations.validateLearningAndDevelopment, validateFields);
router.post('/validate/other-information', validations.validateOtherInformation, validateFields);
router.post('/validate/relationships-legal-info', validations.validateRelationshipsLegalInfo, validateFields);
router.post('/validate/references', validations.validateReferences, validateFields);
router.post('/validate/declaration', validations.validateDeclaration, validateFields);

// 1. Post Personal Information
router.post('/personal-info', async (req, res, next) => {
  console.log(req.personId)
  try {
    const result = await controllers.addPersonalInfo(req, res);
    const { _id } = result; // Assuming the controller returns the new ID

    if (!_id) {
      console.error('Missing personal info ID');
      return res.status(400).json({ error: 'Missing personal info ID' });
    }

    // Store personId in session
    req.session.personId = _id;
    console.log('Stored personId in session:', _id); // Add this line
    res.status(200).json({ message: 'Personal info saved successfully', personId: _id });
  } catch (error) {
    next(error);
  }
});


// Middleware for subsequent routes (using personId from session)
// router.use(ensurePersonIdInSession);

// 2. Post Family Background
router.post('/family-background', (req, res, next) => {
  next();
}, controllers.addFamilyBackground);

// 3. Post Educational Background
router.post('/educational-background', (req, res, next) => {
  next();
}, controllers.addEducationalBackground);

// 4. Post Work Experience
router.post('/work-experience', (req, res, next) => {
  next();
}, controllers.addWorkExperience);

// 5. Post Civil Service Eligibility
router.post('/civil-service-eligibility', (req, res, next) => {
  next();
}, controllers.addCivilServiceEligibility);

// 6. Post Voluntary Work
router.post('/voluntary-work', (req, res, next) => {
  next();
}, controllers.addVoluntaryWork);

// 7. Post Learning and Development
router.post('/learning-and-development', (req, res, next) => {
  next();
}, controllers.addLearningAndDevelopment);

// 8. Post Other Information
router.post('/other-information', (req, res, next) => {
  next();
}, controllers.addOtherInformation);

// 9. Post Relationships and Legal Info
router.post('/relationships-legal-info', (req, res, next) => {
  next();
}, controllers.addRelationshipsLegalInfo);

// 10. Post References
router.post('/references', (req, res, next) => {
  next();
}, controllers.addReferences);

// 11. Post Declaration
router.post('/declaration', (req, res, next) => {
  next();
}, controllers.addDeclaration);

module.exports = router;
