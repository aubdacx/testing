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
router.post('/validate/personal-info', validations.validatePersonalInfo, validateFields, (req, res) => {
  res.status(200).json({ message: 'Personal Info validation passed' });
});

router.post('/validate/family-background', validations.validateFamilyBackground, validateFields, (req, res) => {
  res.status(200).json({ message: 'Family Background validation passed' });
});

router.post('/validate/educational-background', validations.validateEducationalBackground, validateFields, (req, res) => {
  res.status(200).json({ message: 'Educational Background validation passed' });
});

router.post('/validate/work-experience', validations.validateWorkExperience, validateFields, (req, res) => {
  res.status(200).json({ message: 'Work Experience validation passed' });
});

router.post('/validate/civil-service-eligibility', validations.validateCivilServiceEligibility, validateFields, (req, res) => {
  res.status(200).json({ message: 'Civil Service Eligibility validation passed' });
});

router.post('/validate/voluntary-work', validations.validateVoluntaryWork, validateFields, (req, res) => {
  res.status(200).json({ message: 'Voluntary Work validation passed' });
});

router.post('/validate/learning-and-development', validations.validateLearningAndDevelopment, validateFields, (req, res) => {
  res.status(200).json({ message: 'Learning and Development validation passed' });
});

router.post('/validate/other-information', validations.validateOtherInformation, validateFields, (req, res) => {
  res.status(200).json({ message: 'Other Information validation passed' });
});

router.post('/validate/relationships-legal-info', validations.validateRelationshipsLegalInfo, validateFields, (req, res) => {
  res.status(200).json({ message: 'Relationships and Legal Info validation passed' });
});

router.post('/validate/references', validations.validateReferences, validateFields, (req, res) => {
  res.status(200).json({ message: 'References validation passed' });
});

router.post('/validate/declaration', validations.validateDeclaration, validateFields, (req, res) => {
  res.status(200).json({ message: 'Declaration validation passed' });
});

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
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addFamilyBackground
);

// 3. Post Educational Background using the personal info ID
router.post(
  '/educational-background',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
    req.body.personId = req.personId;
    next();
  },
  controllers.addEducationalBackground
);

// 4. Post Work Experience using the personal info ID
router.post(
  '/work-experience',
  (req, res, next) => {
    if (!req.personId) return res.status(400).json({ error: 'Missing reference to personal info ID' });
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
