const mongoose = require('mongoose');

// Personal Info Schema
const PersonalInfoSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  sex: { type: String, enum: ['Male', 'Female'], required: true },
  citizenship: { type: String, required: true },
  csIdNo: { type: String },
  nameExtension: { type: String },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Separated', 'Widowed', 'Others'] },
  nationality: { type: String },
  height: { type: Number },
  weight: { type: Number },
  bloodType: { type: String },
  gsisIdNo: { type: String },
  pagIbigIdNo: { type: String },
  philHealthNo: { type: String },
  sssNo: { type: String },
  tinNo: { type: String },
  agencyEmployeeNo: { type: String },
  permanentAddress: {
    houseBlockLotNo: { type: String },
    street: { type: String },
    subdivisionVillage: { type: String },
    barangay: { type: String },
    cityMunicipality: { type: String },
    province: { type: String },
    zipCode: { type: String }
  },
  telephoneNo: { type: String },
  mobileNo: { type: String },
  emailAddress: { type: String }
}, { collection: 'PDS_PersonalInfo' });

// Family Background Schema
const FamilyBackgroundSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  spouse: {
    surname: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    nameExtension: { type: String },
    occupation: { type: String },
    employerBusinessName: { type: String },
    businessAddress: { type: String },
    telephoneNo: { type: String }
  },
  children: [
    {
      name: { type: String },
      dateOfBirth: { type: Date }
    }
  ],
  father: {
    surname: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    nameExtension: { type: String }
  },
  mother: {
    maidenName: {
      surname: { type: String },
      firstName: { type: String },
      middleName: { type: String }
    }
  }
}, { collection: 'PDS_FamilyBackground' });

// Educational Background Schema
const EducationalBackgroundSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  level: { type: String, enum: ['Elementary', 'Secondary', 'Vocational/Trade Course', 'College', 'Graduate Studies'] },
  schoolName: { type: String },
  basicEducationDegreeCourse: { type: String },
  periodOfAttendance: {
    from: { type: Date },
    to: { type: Date }
  },
  highestLevelUnitsEarned: { type: String },
  yearGraduated: { type: String },
  honorsReceived: { type: String }
}, { collection: 'PDS_EducationalBackground' });

// Work Experience Schema
const WorkExperienceSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  duration: {
    from: { type: Date, required: true },
    to: { type: Date }
  },
  position: { type: String, required: true },
  officeUnit: { type: String },
  immediateSupervisor: { type: String },
  agencyOrganization: { 
    name: { type: String },
    location: { type: String }
  },
  accomplishments: [{ type: String }],
  summaryOfDuties: { type: String },
  monthlySalary: { type: Number },
  payGrade: { type: String },
  statusOfAppointment: { type: String },
  govService: { type: Boolean }
}, { collection: 'PDS_WorkExperience' });

// Civil Service Eligibility Schema
const CivilServiceEligibilitySchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  careerService: { type: String, required: true },
  rating: { type: String },
  dateOfExamination: { type: Date },
  placeOfExamination: { type: String },
  licenseNumber: { type: String },
  validityDate: { type: Date }
}, { collection: 'PDS_CivilServiceEligibility' });

// Voluntary Work Schema
const VoluntaryWorkSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  organizationName: { type: String, required: true },
  organizationAddress: { type: String },
  duration: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  numberOfHours: { type: Number },
  positionOrNatureOfWork: { type: String }
}, { collection: 'PDS_VoluntaryWork' });

// Learning and Development Schema
const LearningAndDevelopmentSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  title: { type: String, required: true },
  duration: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  numberOfHours: { type: Number },
  typeOfLD: { type: String },
  conductedBy: { type: String }
}, { collection: 'PDS_LearningAndDevelopment' });

// Other Information Schema
const OtherInformationSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  specialSkillsAndHobbies: [{ type: String }],
  nonAcademicDistinctions: [{ type: String }],
  memberships: [{ type: String }]
}, { collection: 'PDS_OtherInformation' });

// Relationships and Legal Information Schema
const RelationshipsLegalInfoSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  relatedToAuthority: {
    thirdDegree: { type: Boolean },
    fourthDegree: { type: Boolean },
    details: { type: String }
  },
  administrativeOffense: {
    foundGuilty: { type: Boolean },
    details: { type: String }
  },
  criminalCharges: {
    charged: { type: Boolean },
    details: { type: String },
    dateFiled: { type: Date },
    statusOfCase: { type: String }
  },
  convictions: {
    convicted: { type: Boolean },
    details: { type: String }
  },
  separationFromService: {
    separated: { type: Boolean },
    details: { type: String }
  },
  electionCandidacy: {
    wasCandidate: { type: Boolean },
    details: { type: String }
  },
  electionResignation: {
    resigned: { type: Boolean },
    details: { type: String }
  },
  immigrantStatus: {
    isImmigrant: { type: Boolean },
    country: { type: String }
  },
  specialCategories: {
    indigenousGroup: { type: Boolean },
    indigenousDetails: { type: String },
    personWithDisability: { type: Boolean },
    disabilityIdNo: { type: String },
    soloParent: { type: Boolean },
    soloParentIdNo: { type: String }
  }
}, { collection: 'PDS_RelationshipsLegalInfo' });

// References Schema
const ReferencesSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  name: { type: String, required: true },
  address: { type: String },
  telNo: { type: String }
}, { collection: 'PDS_References' });

// Declaration Schema
const DeclarationSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true }, // Reference to PersonalInfo
  declarationStatement: { type: String, default: 'I declare under oath that I have personally accomplished...' },
  governmentId: {
    type: { type: String },
    idNo: { type: String },
    dateOfIssuance: { type: Date },
    placeOfIssuance: { type: String }
  },
  signature: { type: String },
  dateAccomplished: { type: Date },
  rightThumbmark: { type: String },
  administeringOath: { type: String }
}, { collection: 'PDS_Declaration' });

module.exports = {
  PersonalInfo: mongoose.model('PersonalInfo', PersonalInfoSchema),
  FamilyBackground: mongoose.model('FamilyBackground', FamilyBackgroundSchema),
  EducationalBackground: mongoose.model('EducationalBackground', EducationalBackgroundSchema),
  WorkExperience: mongoose.model('WorkExperience', WorkExperienceSchema),
  CivilServiceEligibility: mongoose.model('CivilServiceEligibility', CivilServiceEligibilitySchema),
  VoluntaryWork: mongoose.model('VoluntaryWork', VoluntaryWorkSchema),
  LearningAndDevelopment: mongoose.model('LearningAndDevelopment', LearningAndDevelopmentSchema),
  OtherInformation: mongoose.model('OtherInformation', OtherInformationSchema),
  RelationshipsLegalInfo: mongoose.model('RelationshipsLegalInfo', RelationshipsLegalInfoSchema),
  References: mongoose.model('References', ReferencesSchema),
  Declaration: mongoose.model('Declaration', DeclarationSchema)
};