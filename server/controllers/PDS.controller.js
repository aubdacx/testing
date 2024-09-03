const {
    PersonalInfo,
    FamilyBackground,
    EducationalBackground,
    WorkExperience,
    CivilServiceEligibility,
    VoluntaryWork,
    LearningAndDevelopment,
    OtherInformation,
    RelationshipsLegalInfo,
    References,
    Declaration,
  } = require('../models/PDS.model'); // Adjust the path based on your project structure
  
  // Helper function to handle errors
  const handleErrors = (res, error) => {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  };
  
  // General Add Function Template with personId
  const addDocument = async (Model, req, res) => {
    try {
      // Ensure personId is set based on PersonalInfo
      if (Model.modelName !== 'PersonalInfo') {
        const { personId } = req.body;
        if (!personId || !(await PersonalInfo.exists({ _id: personId }))) {
          return res.status(400).json({ message: 'Invalid personId' });
        }
      }
  
      const document = new Model(req.body);
      await document.save();
      res.status(201).json({ message: `${Model.modelName} added successfully`, data: document });
    } catch (error) {
      handleErrors(res, error);
    }
  };
  
  // General Edit Function Template with personId
  const editDocument = async (Model, req, res) => {
    try {
      const { id } = req.params;
  
      // Ensure personId is set based on PersonalInfo
      if (Model.modelName !== 'PersonalInfo') {
        const { personId } = req.body;
        if (personId && !(await PersonalInfo.exists({ _id: personId }))) {
          return res.status(400).json({ message: 'Invalid personId' });
        }
      }
  
      const updatedDocument = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedDocument) return res.status(404).json({ message: `${Model.modelName} not found` });
      res.status(200).json({ message: `${Model.modelName} updated successfully`, data: updatedDocument });
    } catch (error) {
      handleErrors(res, error);
    }
  };
  
  // General Get Function Template
  const getDocument = async (Model, req, res) => {
    try {
      const { id } = req.params;
      const document = id ? await Model.findById(id) : await Model.find();
      if (!document) return res.status(404).json({ message: `${Model.modelName} not found` });
      res.status(200).json(document);
    } catch (error) {
      handleErrors(res, error);
    }
  };
  
  // Exporting Specific Add, Edit, and Get Functions
  module.exports = {
    getPersonalInfo: (req, res) => getDocument(PersonalInfo, req, res),
    addPersonalInfo: (req, res) => addDocument(PersonalInfo, req, res),
    editPersonalInfo: (req, res) => editDocument(PersonalInfo, req, res),
  
    getFamilyBackground: (req, res) => getDocument(FamilyBackground, req, res),
    addFamilyBackground: (req, res) => addDocument(FamilyBackground, req, res),
    editFamilyBackground: (req, res) => editDocument(FamilyBackground, req, res),
  
    getEducationalBackground: (req, res) => getDocument(EducationalBackground, req, res),
    addEducationalBackground: (req, res) => addDocument(EducationalBackground, req, res),
    editEducationalBackground: (req, res) => editDocument(EducationalBackground, req, res),
  
    getWorkExperience: (req, res) => getDocument(WorkExperience, req, res),
    addWorkExperience: (req, res) => addDocument(WorkExperience, req, res),
    editWorkExperience: (req, res) => editDocument(WorkExperience, req, res),
  
    getCivilServiceEligibility: (req, res) => getDocument(CivilServiceEligibility, req, res),
    addCivilServiceEligibility: (req, res) => addDocument(CivilServiceEligibility, req, res),
    editCivilServiceEligibility: (req, res) => editDocument(CivilServiceEligibility, req, res),
  
    getVoluntaryWork: (req, res) => getDocument(VoluntaryWork, req, res),
    addVoluntaryWork: (req, res) => addDocument(VoluntaryWork, req, res),
    editVoluntaryWork: (req, res) => editDocument(VoluntaryWork, req, res),
  
    getLearningAndDevelopment: (req, res) => getDocument(LearningAndDevelopment, req, res),
    addLearningAndDevelopment: (req, res) => addDocument(LearningAndDevelopment, req, res),
    editLearningAndDevelopment: (req, res) => editDocument(LearningAndDevelopment, req, res),
  
    getOtherInformation: (req, res) => getDocument(OtherInformation, req, res),
    addOtherInformation: (req, res) => addDocument(OtherInformation, req, res),
    editOtherInformation: (req, res) => editDocument(OtherInformation, req, res),
  
    getRelationshipsLegalInfo: (req, res) => getDocument(RelationshipsLegalInfo, req, res),
    addRelationshipsLegalInfo: (req, res) => addDocument(RelationshipsLegalInfo, req, res),
    editRelationshipsLegalInfo: (req, res) => editDocument(RelationshipsLegalInfo, req, res),
  
    getReferences: (req, res) => getDocument(References, req, res),
    addReferences: (req, res) => addDocument(References, req, res),
    editReferences: (req, res) => editDocument(References, req, res),
  
    getDeclaration: (req, res) => getDocument(Declaration, req, res),
    addDeclaration: (req, res) => addDocument(Declaration, req, res),
    editDeclaration: (req, res) => editDocument(Declaration, req, res),
  };
  