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

// Sequential Posting Routes

// 1. Post Personal Information
router.post(
  '/personal-info',
  controllers.addPersonalInfo,
  async (req, res, next) => {
    const { _id } = req.body; // Assuming the controller adds the personal info and returns the new `_id` as `personId`
    if (!_id) return res.status(400).json({ error: 'Missing personal info ID' });
    req.personId = _id; // Save the personId to pass to the next step
    next();
  }
);

// 2. Post Family Background using the personal info ID
router.post(
  '/family-background',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID fam BG' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addFamilyBackground
);

// 3. Post Educational Background using the personal info ID
router.post(
  '/educational-background',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info Ed BG' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addEducationalBackground
);

// 4. Post Work Experience using the personal info ID
router.post(
  '/work-experience',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID Work XP' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addWorkExperience
);

// 5. Post Civil Service Eligibility using the personal info ID
router.post(
  '/civil-service-eligibility',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addCivilServiceEligibility
);

// 6. Post Voluntary Work using the personal info ID
router.post(
  '/voluntary-work',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addVoluntaryWork
);

// 7. Post Learning and Development using the personal info ID
router.post(
  '/learning-and-development',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addLearningAndDevelopment
);

// 8. Post Other Information using the personal info ID
router.post(
  '/other-information',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addOtherInformation
);

// 9. Post Relationships and Legal Info using the personal info ID
router.post(
  '/relationships-legal-info',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addRelationshipsLegalInfo
);

// 10. Post References using the personal info ID
router.post(
  '/references',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addReferences
);

// 11. Post Declaration using the personal info ID
router.post(
  '/declaration',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addDeclaration
);

module.exports = router;
