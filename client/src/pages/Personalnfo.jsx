import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

function Personalnfo() {
  const [formData, setFormData] = useState({
    surname: '', firstName: '', middleName: '', dateOfBirth: '', placeOfBirth: '', sex: '', civilStatus: '', nameExtension: '',
    height: '', weight: '', bloodType: '', gsisID: '', pagibigID: '', philhealthID: '', sssID: '', tinID: '', agencyEmployeeNo: '',
    citizenship: '', country: '', dualCitizenshipMode: '', dualCitizenshipCountry: '', residentialAddress: '', residentialZipCode: '',
    residentialTelephone: '', permanentAddress: '', permanentZipCode: '', permanentTelephone: '', emailAddress: '', mobileNumber: '',
    signature: '', date: '', province: '', cityMunicipality: '', barangay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  const navigate = useNavigate(); 
  const handleNextClick = () => {
    const requiredFields = [
      'surname', 'firstName', 'dateOfBirth', 'placeOfBirth', 'sex', 'civilStatus',
      'height', 'weight', 'bloodType', 'gsisID', 'pagibigID', 'philhealthID',
      'sssID', 'tinID', 'agencyEmployeeNo', 'citizenship', 'residentialAddress',
      'residentialZipCode', 'emailAddress', 'mobileNumber', 'signature', 'date',
      'province', 'cityMunicipality', 'barangay'
    ];

    const allFieldsFilled = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    const isSignatureFilled = formData.signature.trim() !== '';

    if (allFieldsFilled && isSignatureFilled) {
      navigate('/Family');
    } else {
      alert('Please fill out all required fields and provide a signature before proceeding.');
    }
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
              <label>2. Surname</label>
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
              <label>3. Date of Birth (mm/dd/yyyy)</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>4. Place of Birth</label>
              <input
                type="text"
                className="form-control"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
              />
            </div>
          
          </div>
          <div className="row">
          <div className="col-md-4 mb-3">
              <label>5. Sex</label>
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
            <div className="col-md-4 mb-3">
              <label>6. Civil Status</label>
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
          </div>
          <div className="row">
          <div className="col-md-4 mb-3">
              <label>7. Height (cm)</label>
              <input
                type="number"
                className="form-control"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>8. Weight (kg)</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>9. Blood Type</label>
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
              <label>10. GSIS ID No.</label>
              <input
                type="text"
                className="form-control"
                name="gsisID"
                value={formData.gsisID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>11. PAG-IBIG ID No.</label>
              <input
                type="text"
                className="form-control"
                name="pagibigID"
                value={formData.pagibigID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>12. PhilHealth No.</label>
              <input
                type="text"
                className="form-control"
                name="philhealthID"
                value={formData.philhealthID}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>13. SSS No.</label>
              <input
                type="text"
                className="form-control"
                name="sssID"
                value={formData.sssID}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>14. Agency Employee No.</label>
              <input
                type="text"
                className="form-control"
                name="agencyEmployeeNo"
                value={formData.agencyEmployeeNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>15. TIN No.</label>
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
              <label>16. Citizenship</label>
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
         <label>17. Residential Address</label>
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
              <input
                type="text"
                className="form-control"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Municipality</label>
              <input
                type="text"
                className="form-control"
                name="cityMunicipality"
                value={formData.cityMunicipality}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Barangay</label>
              <input
                type="text"
                className="form-control"
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
              />
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
          <label>18. Permanent Address</label>
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
              <input
                type="text"
                className="form-control"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Municipality</label>
              <input
                type="text"
                className="form-control"
                name="cityMunicipality"
                value={formData.cityMunicipality}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Barangay</label>
              <input
                type="text"
                className="form-control"
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
              />
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
              <label>19. Telephone No.</label>
              <input
                type="text"
                className="form-control"
                name="permanentTelephone"
                value={formData.permanentTelephone}
                onChange={handleChange}
              />
            </div>
          
            <div className="col-md-4 mb-3">
              <label>20. Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>21. E-Mail Address (if any)</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
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
            <button  type="button"  className="btn btn-primary"  onClick={handleNextClick} >  Next </button>
            </div>
                    </form>
                  </div>
                </div>
              );
            }
export default Personalnfo;
