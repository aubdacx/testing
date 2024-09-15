import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Declaration() {
    const [currentPage, setCurrentPage] = useState(11); 
    const totalPages = 11; 

    const [formData, setFormData] = useState({
        personID: '',
        governmentId: { type: '', idNo: '', dateOfIssuance: '', placeOfIssuance: '' },
        signature: '',
        dateAccomplished: '',
        photoUploaded: false,
        thumbmarkUploaded: false,
        swornDate: '',
        administeringOath: '',
    });
    const sigCanvas = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (section, field, value) => {
        if (section === 'govID') {
            setFormData({
                ...formData,
                governmentId: { ...formData.governmentId, [field]: value }
            });
        } else {
            setFormData({ ...formData, [section]: value });
        }
    };

    const handleClear = () => {
        sigCanvas.current.clear();
        setFormData({ ...formData, signature: '' }); // Clear signature data
    };

    const handlePhotoUpload = (e) => {
        if (e.target.files.length > 0) {
            setFormData({ ...formData, photoUploaded: true });
        }
    };

    const handleThumbmarkUpload = (e) => {
        if (e.target.files.length > 0) {
            setFormData({ ...formData, thumbmarkUploaded: true });
        }
    };

    const handleNavigation = (page) => {
        navigate(page);
    };

    const getSignatureData = () => {
        return sigCanvas.current?.toDataURL(); 
    };

    const handleSubmit = async () => {
        const signatureData = getSignatureData();
        if (signatureData) {
            setFormData({ ...formData, signature: signatureData });
        }
    
        try {
            const personalInfo = JSON.parse(sessionStorage.getItem('personalInfo')) || {};
        
            const res = await axios.post('http://localhost:3000/api/pds/personal-info', personalInfo);
            
            const personId = res.data.personId;
            console.log('Response Data:', res.data);
            console.log('Person ID:', personId);
    
            if (!personId) {
                throw new Error('Person ID is not available');
            }
            
            sessionStorage.setItem("personId", JSON.stringify(personId));
    
            const sections = [
                'FamilyBG',
                'EducationalBG',
                'workExperience',
                'Eligibility',
                'voluntaryWork',
                'LearningDev',
                'OtherInfo',
                'RelationshipInfo',
                'References'
            ];
        
            sections.forEach(key => {
                const sectionData = JSON.parse(sessionStorage.getItem(key)) || {};
                const updatedSectionData = { ...sectionData, personId };
                sessionStorage.setItem(key, JSON.stringify(updatedSectionData));
            });
        
            const endpoints = [
                '/family-background',
                '/educational-background',
                '/work-experience',
                '/civil-service-eligibility',
                '/voluntary-work',
                '/learning-and-development',
                '/other-information',
                '/relationships-legal-info',
                '/references'
            ];
        
            for (const [index, url] of endpoints.entries()) {
                const sectionKey = sections[index];
                const sectionData = JSON.parse(sessionStorage.getItem(sectionKey)) || {};
                try {
                    await axios.post(`http://localhost:3000/api/pds${url}`, sectionData);
                } catch (err) {
                    console.error(`Error posting ${sectionKey}:`, err.response ? err.response.data : err.message);
                    alert(`Failed to submit ${sectionKey}. Error: ${err.response ? err.response.data.error : err.message}`);
                    return; 
                }
            }
        
            const updatedPersonalInfo = { ...personalInfo, personId };
            sessionStorage.setItem('personalInfo', JSON.stringify(updatedPersonalInfo));
        
            if (validateForm({ ...formData, personalInfo: updatedPersonalInfo })) {
                console.log({ ...formData, personalInfo: updatedPersonalInfo });
                alert('Form submitted successfully!');
            } else {
                console.log({ ...formData, personalInfo: updatedPersonalInfo });
                alert('Please fill in all required fields.');
            }
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            alert('Failed to submit form. Please try again. Error: ' + (error.response ? error.response.data.error : error.message));
        }
    };
    
    const validateForm = () => {
        const {
            governmentId,
            signature,
            dateAccomplished,
            photoUploaded,
            thumbmarkUploaded,
            swornDate,
            administeringOath
        } = formData;

        return (
            governmentId &&
            governmentId.type?.trim() !== '' &&
            governmentId.idNo?.trim() !== '' &&
            governmentId.dateOfIssuance?.trim() !== '' &&
            governmentId.placeOfIssuance?.trim() !== '' &&
            signature?.trim() !== '' &&
            dateAccomplished?.trim() !== '' &&
            photoUploaded &&
            thumbmarkUploaded &&
            swornDate?.trim() !== '' &&
            administeringOath?.trim() !== ''
        );
    };

    return (
        <div className="container mt-4">
            {/* Navigation Bar */}

            <div className="border p-4">
                <label>
                    42. I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein. I agree that any misrepresentation made in this document and its attachments shall cause the filing of administrative/criminal case/s against me.
                </label>

                <div className="mt-3">
                    <label>Government Issued ID (i.e. Passport, GSIS, SSS, PRC, Driver's License, etc.)</label>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Government Issued ID"
                            value={formData.governmentId.type}
                            onChange={(e) => handleInputChange('governmentId', 'type', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ID/License/Passport No."
                            value={formData.governmentId.idNo}
                            onChange={(e) => handleInputChange('governmentId', 'idNo', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Date/Place of Issuance"
                            value={formData.governmentId.dateOfIssuance}
                            onChange={(e) => handleInputChange('governmentId', 'dateOfIssuance', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Place of Issuance"
                            value={formData.governmentId.placeOfIssuance}
                            onChange={(e) => handleInputChange('governmentId', 'placeOfIssuance', e.target.value)}
                        />
                    </div>
                </div>

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
                        <label className="form-label">Date Accomplished</label>
                        <input
                            type="date"
                            className="form-control"
                            value={formData.dateAccomplished}
                            onChange={(e) => handleInputChange('dateAccomplished', '', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                        <label>ID Picture (taken within the last 6 months)</label>
                        <div className="border p-3 mb-3" style={{ height: '200px' }}>
                            {formData.photoUploaded ? (
                                <p>Photo uploaded</p>
                            ) : (
                                <input type="file" onChange={handlePhotoUpload} accept="image/*" />
                            )}
                        </div>
                        <p className="text-center">PHOTO</p>
                    </div>
                    <div className="col-md-6 mb-4">
                        <label>Right Thumbmark</label>
                        <div className="border p-3 mb-3" style={{ height: '200px' }}>
                            {formData.thumbmarkUploaded ? (
                                <p>Thumbmark uploaded</p>
                            ) : (
                                <input type="file" onChange={handleThumbmarkUpload} accept="image/*" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="text-center mt-3">
                        <p>Sworn to before me this __ day of ____, 20___ at ____, Philippines.</p>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Date"
                            value={formData.swornDate}
                            onChange={(e) => handleInputChange('swornDate', '', e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Place"
                            value={formData.administeringOath}
                            onChange={(e) => handleInputChange('administeringOath', '', e.target.value)}
                        />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>

                <div className="mb-4">
            <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/References')}>
              &lt;
            </button>   
          </li>
          <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/PersonalInfo')}>1</button>
          </li>
          <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Family')}>2</button>
          </li>
          <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Educational')}>3</button>
          </li>
          <li className={`page-item ${currentPage === 4 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Eligibility')}>4</button>
          </li>
          <li className={`page-item ${currentPage === 5 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/WorkExperience')}>5</button>
          </li>
          <li className={`page-item ${currentPage === 6 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/VoluntaryWork')}>6</button>
          </li>
          <li className={`page-item ${currentPage === 7 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/LearningDev')}>7</button>
          </li>
          <li className={`page-item ${currentPage === 8 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/OtherInfo')}>8</button>
          </li>
          <li className={`page-item ${currentPage === 9 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/RelationshipInfo')}>9</button>
          </li>
          <li className={`page-item ${currentPage === 10 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/References')}>10</button>
          </li>
          <li className={`page-item ${currentPage === 11 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Declaration')}>11</button>
          </li>
        </ul>
      </nav>
            </div>
            </div>
        </div>
    );
}

export default Declaration;
