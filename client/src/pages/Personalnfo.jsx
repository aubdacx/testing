import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignatureCanvas from 'react-signature-canvas';
import Sidebar from './Sidebar';

function Personalnfo() {
  const [formData, setFormData] = useState({
    surname: '', firstName: '', middleName: '', dateOfBirth: '', placeOfBirth: '', sex: '', civilStatus: '', nameExtension: '',
    height: '', weight: '', bloodType: '', gsisID: '', pagibigID: '', philhealthID: '', sssID: '', tinID: '', agencyEmployeeNo: '',
    citizenship: '', country: '', dualCitizenshipMode: '', dualCitizenshipCountry: '', residentialAddress: '', residentialZipCode: '',
    residentialTelephone: '', permanentAddress: '', permanentZipCode: '', permanentTelephone: '', emailAddress: '', mobileNumber: '',
    spouseSurname: '', spouseFirstName: '', spouseMiddleName: '', spouseOccupation: '', spouseEmployer: '', spouseBusinessAddress: '',
    spouseTelephone: '', children: [{ name: '', dateOfBirth: '' }], fatherSurname: '', fatherFirstName: '', fatherMiddleName: '',
    motherSurname: '', motherFirstName: '', motherMiddleName: '', education: [{ level: '', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' }],
    signature: '', date: '',   province: '', cityMunicipality: '',barangay: '',
  });
  
const [municipalities, setMunicipalities] = useState([]);
const [barangays, setBarangays] = useState([]);

const data = {
  "Batanes": {
    " Basco": [" Ihubok I", " Ihubok II", " San Antonio", " San Joaquin", " Chanarian", " Kayhuvokan",  ],
    "Itbayat":  [ ],
    " Ivana":  [ ],
    "Mahatao": [],
    "Sabtang":  [],
    "Uyugan":  []
  },
  "Cagayan": {
    "Tuguegarao City": ["Annafunan East ", "Atulayan Norte ","Annafunan East ", "Bagay ", "Centro 1  ", " Centro 4", "Centro 5 ", "Centro 6 ", "Centro 7  ", " Centro 8", "Centro 9 "],
    "Alcala": ["Alinunu", "Bagu "]

  },
   "Isabela": {
    "Cauayan": [" Alicaocao", "Alinam "],
    "Ilagan ": ["Cabeseria 27", "Aggasian "],
    "Santiago ": ["Abra ", "Ambalatungan "]
  },
  "Nueva Vizcaya": {
    "Ambaguio": [],
    "Aritao ": ["Banganan", "Beti ","Bone North", "Bone South ","Calitlitan", "Comon ", "Cutar", "Darapidap ","Kirang", "Nagcuartelan "],
    "Bagabag": [""],
    "Bambang ": [""],
    "Bayombong": [],
    "Diadi ": [],
    "Dupax del Norte ": [],
    "Dupax del Sur": [],
    "Kasibu ": [],
    "Kayapa": []
  },
  "Quirino": {
    "": [],
    "": []
  }
};

const handleProvinceChange = (e) => {
  const selectedProvince = e.target.value;
  setFormData({
    ...formData,
    province: selectedProvince,
    cityMunicipality: '',
    barangay: ''
  });

  setMunicipalities(Object.keys(data[selectedProvince] || {}));
  setBarangays([]);
};

const handleMunicipalityChange = (e) => {
  const selectedMunicipality = e.target.value;
  setFormData({
    ...formData,
    cityMunicipality: selectedMunicipality,
    barangay: ''
  });

  setBarangays(data[formData.province][selectedMunicipality] || []);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { level: '', schoolName: '', degree: '', attendanceFrom: '', attendanceTo: '', unitsEarned: '', yearGraduated: '', honors: '' }]
    });
  };

  const handleChildrenChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...formData.children];
    newChildren[index][name] = value;
    setFormData({
      ...formData,
      children: newChildren,
    });
  };

  const handleAddChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { name: '', dateOfBirth: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };  

  const sigCanvas = useRef(null);

  const handleClear = () => {
    sigCanvas.current.clear();
    setFormData({ ...formData, signature: '' });
  };

  const handleSignatureEnd = () => {
    setFormData({ ...formData, signature: sigCanvas.current.toDataURL() });
  };


  return (
    <div className="container mt-5">
      {/* <p><i><b>CS Form No. 212
        <br/>Revised 2017</b></i></p> */}
   <h2 className="text-center"><b> PERSONAL DATA SHEET </b></h2>
      {/* <p> <b> <i> WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience 
        Sheet shall cause the filling of admistrative/criminal case/s against the person concerned.
        <br/> READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS) BEFORE ACCOMPLISING THE PDS FORM. </i></b> </p>
    */}
   {/* Personal Info */}
      <div className="card p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
          <h4> <i> I. PERSONAL INFORMATION</i></h4>
            <div className="col-md-4 mb-3">
              <label>Surname</label>
              <input   type="text" className="form-control"  name="surname" value={formData.surname} onChange={handleChange}/>
            </div>
            <div className="col-md-4 mb-3">
              <label>First Name</label>
              <input type="text" className="form-control"name="firstName" value={formData.firstName} onChange={handleChange}/>
            </div>
            <div className="col-md-4 mb-3">
              <label>Middle Name</label>
              <input type="text"  className="form-control" name="middleName" value={formData.middleName}onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Name Extension (e.g., Jr., Sr.)</label>
              <input
                type="text"
                className="form-control"
                name="nameExtension"
                value={formData.nameExtension}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Date of Birth (mm/dd/yyyy)</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Place of Birth</label>
              <input
                type="text"
                className="form-control"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Sex</label>
              <select
                className="form-control"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Civil Status</label>
              <select
                className="form-control"
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widow/er">Widow/er</option>
                <option value="Separated">Separated</option>
                <option value="Solo Parent">Solo Parent</option>
              </select>
            </div>
    
            <div className="col-md-4 mb-3">
              <label>Height (cm)</label>
              <input
                type="number"
                className="form-control"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Weight (kg)</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Blood Type</label>
              <input
                type="text"
                className="form-control"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
              />
            </div>
            <div>
         
          </div>
          <div className="row">
          <div className="col-md-4 mb-3">
              <label>GSIS ID No.</label>
              <input
                type="text"
                className="form-control"
                name="gsisID"
                value={formData.gsisID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>PAG-IBIG ID No.</label>
              <input
                type="text"
                className="form-control"
                name="pagibigID"
                value={formData.pagibigID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>PhilHealth No.</label>
              <input
                type="text"
                className="form-control"
                name="philhealthID"
                value={formData.philhealthID}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>SSS No.</label>
              <input
                type="text"
                className="form-control"
                name="sssID"
                value={formData.sssID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Agency Employee No.</label>
              <input
                type="text"
                className="form-control"
                name="agencyEmployeeNo"
                value={formData.agencyEmployeeNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>TIN No.</label>
              <input
                type="text"
                className="form-control"
                name="tinID"
                value={formData.tinID}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
           
          
            </div>
            <div className="col-md-4 mb-3">
              <label>Citizenship</label>
              <select
                className="form-control"
                name="citizenship"
                value={formData.citizenship}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Filipino">Filipino</option>
                <option value="Dual Citizenship">Dual Citizenship</option>
              </select>
            </div>
          </div>
          {formData.citizenship === 'Dual Citizenship' && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>If Dual Citizenship, by Birth or Naturalization</label>
                <select
                  className="form-control"
                  name="dualCitizenshipMode"
                  value={formData.dualCitizenshipMode}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="By Birth">By Birth</option>
                  <option value="By Naturalization">By Naturalization</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="dualCitizenshipCountry"
                  value={formData.dualCitizenshipCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
         <div className="row">
         <h5>Residential Address</h5>
            <div className="col-md-4 mb-3">
              <label>House/Block/Lot No.</label>
              <input
                type="text"
                className="form-control"
                name="houseBlockLot"
                value={formData.houseBlockLot}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Subdivision/Village</label>
              <input
                type="text"
                className="form-control"
                name="subdivisionVillage"
                value={formData.subdivisionVillage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Street</label>
              <input
                type="text"
                className="form-control"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Province</label>
                <select
                  className="form-select"
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {Object.keys(data).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>City/Municipality</label>
                <select
                  className="form-select"
                  name="cityMunicipality"
                  value={formData.cityMunicipality}
                  onChange={handleMunicipalityChange}
                  disabled={!formData.province}
                >
                  <option value="">Select City/Municipality</option>
                  {municipalities.map((municipality) => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>Barangay</label>
                <select
                  className="form-select"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  disabled={!formData.cityMunicipality}
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay} value={barangay}>
                      {barangay}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-2 mb-3">
              <label>ZIP Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        < div  className="row">
          <h5>Permanent Address</h5>
            <div className="col-md-4 mb-3">
              <label>House/Block/Lot No.</label>
              <input
                type="text"
                className="form-control"
                name="houseBlockLot"
                value={formData.houseBlockLot}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Subdivision/Village</label>
              <input
                type="text"
                className="form-control"
                name="subdivisionVillage"
                value={formData.subdivisionVillage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Street</label>
              <input
                type="text"
                className="form-control"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>Province</label>
                <select
                  className="form-select"
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {Object.keys(data).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>City/Municipality</label>
                <select
                  className="form-select"
                  name="cityMunicipality"
                  value={formData.cityMunicipality}
                  onChange={handleMunicipalityChange}
                  disabled={!formData.province}
                >
                  <option value="">Select City/Municipality</option>
                  {municipalities.map((municipality) => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label>Barangay</label>
                <select
                  className="form-select"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleChange}
                  disabled={!formData.cityMunicipality}
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay} value={barangay}>
                      {barangay}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-2 mb-3">
              <label>ZIP Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Telephone No.</label>
              <input
                type="text"
                className="form-control"
                name="permanentTelephone"
                value={formData.permanentTelephone}
                onChange={handleChange}
              />
            </div>
          </div>

      {/* Family Background */}
          <h4><i> II. FAMILY BACKGROUND</i></h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label> 22. Spouse's Surname</label>
              <input
                type="text"
                className="form-control"
                name="spouseSurname"
                value={formData.spouseSurname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> First Name</label>
              <input
                type="text"
                className="form-control"
                name="spouseFirstName"
                value={formData.spouseFirstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="spouseMiddleName"
                value={formData.spouseMiddleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Extension Name</label>
              <input
                type="text"
                className="form-control"
                name="spouseExtensionName"
                value={formData.spouseExtensionName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Occupation</label>
              <input
                type="text"
                className="form-control"
                name="occupation"
                value={formData.spouseOccupation}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Employer/Business Name</label>
              <input
                type="text"
                className="form-control"
                name="employer"
                value={formData.spouseEmployer}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Business Address</label>
              <input
                type="text"
                className="form-control"
                name="businessAddress"
                value={formData.spouseBusinessAddress}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Telephone No.</label>
              <input
                type="text"
                className="form-control"
                name="telephoneNo"
                value={formData.spouseTelephoneNo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>23. Name of Children (Write full name and list all)</label>
              {formData.children.map((child, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Child's Name"
                      value={child.name}
                      onChange={(e) => handleChildrenChange(index, e)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={child.dateOfBirth}
                      onChange={(e) => handleChildrenChange(index, e)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddChild}>Add Child</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>24. Father's Surname</label>
              <input
                type="text"
                className="form-control"
                name="fatherSurname"
                value={formData.fatherSurname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> First Name</label>
              <input
                type="text"
                className="form-control"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="fatherMiddleName"
                value={formData.fatherMiddleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Extension Name</label>
              <input
                type="text"
                className="form-control"
                name="fatherExtensionName"
                value={formData.fatherExtensionName}
                onChange={handleChange}
              />
            </div>
            
          </div>

          <div className="row">
          <div className="col-md-4 mb-3">
              <label>25. Mother's Maiden Name</label>
              <input  type="text" className="form-control"name="motherMaide"
                value={formData.motherMaiden} onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Surname</label>
              <input type="text"
                className="form-control" name="motherSurname"
                value={formData.motherSurname} onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="fmotherFirstName"
                value={formData.motherFirstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> Middle Name</label>
              <input
                type="text"
                className="form-control"
                name="motherMiddleName"
                value={formData.motherMiddleName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label> Extension Name</label>
              <input
                type="text"
                className="form-control"
                name="motherExtensionName"
                value={formData.motherExtensionName}
                onChange={handleChange}
              />
            </div>
            
          </div>
         
         {/* Educational Background */}
          <h4><i> III. EDUCATIONAL BACKGROUND</i></h4>
          {formData.education.map((education, index) => (
            <div key={index} className="row mb-3">

              <div className="col-md-4">
              <label> 26. Level</label>
                <select
                  className="form-select"
                  name="level"
                  value={education.level}
                  onChange={(e) => handleEducationChange(index, e)}
                >
                  <option value="">Select Level</option>
                  <option value="elementary">Elementary</option>
                  <option value="secondary">Secondary</option>
                  <option value="vocational">Vocational/Trade Course</option>
                  <option value="college">College</option>
                  <option value="graduate">Graduate Studies</option>
                </select>
              </div>

            
              <div className="col-md-4">
              <label> School Name (Write the full)</label>
                <input
                
                  type="text"
                  className="form-control"
                  name="schoolName"
                  value={education.schoolName}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>

              <div className="col-md-4">
              <label> Basic Education/Degree/Course (Write the full)</label>
                <input
                  type="text"
                  className="form-control"
                  name="degree"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>

              <div className="row mt-3">
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="attendanceFrom"
                    placeholder="From"
                    value={education.attendanceFrom}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="attendanceTo"
                    placeholder="To"
                    value={education.attendanceTo}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
              </div>

              <div className="col-md-4 mt-3">
              <label> Highest Level/Units Earned (if not graduated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="highestLevel"
                  value={education.highestLevel}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>

              <div className="col-md-4 mt-3">
              <label> Year Graduate</label>
                <input
                  type="text"
                  className="form-control"
                  name="yearGraduated"
                  value={education.yearGraduated}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>

              <div className="col-md-4 mt-3">
              <label> Scholarship/Academic Honors</label>
                <input
                  type="text"
                  className="form-control"
                  name="scholarshipHonors"
                  value={education.scholarshipHonors}
                  onChange={(e) => handleEducationChange(index, e)}
                />
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-secondary mb-4" onClick={handleAddEducation}>Add Education</button>
          
          <div className="row">
          
          </div>
          
            {/* Signature and Date */}
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <label className="form-label">Signature</label>
                <div className="border border-secondary rounded p-2">
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                      width: 500,
                      height: 80,
                      className: 'signature-canvas'
                    }}
                    onEnd={handleSignatureEnd}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={handleClear}
                >
                  Clear Signature
                </button>
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            

                    </form>
                  </div>
                </div>
              );
            }
export default Personalnfo;
