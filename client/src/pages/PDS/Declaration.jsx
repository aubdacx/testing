import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Declaration() {
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
        return sigCanvas.current?.toDataURL(); // Get signature as base64 image
    };

    const handleSubmit = async () => {
        const signatureData = getSignatureData();
        if (signatureData) {
            setFormData({ ...formData, signature: signatureData });
        }
    
        try {
            // Retrieve the personalInfo from sessionStorage
            const personalInfo = JSON.parse(sessionStorage.getItem('personalInfo')) || {};
        
            // Post personalInfo to the server
            const res = await axios.post('http://localhost:3000/api/pds/personal-info', personalInfo);
            
            // Extract the personId from the response
            const personId = res.data.personId;
            console.log('Response Data:', res.data);
            console.log('Person ID:', personId);
    
            if (!personId) {
                throw new Error('Person ID is not available');
            }
            
            // Update sessionStorage with personId
            sessionStorage.setItem("personId", JSON.stringify(personId));
    
            // Define endpoints and keys for section data
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
        
            // Update each section with personId and save back to session storage
            sections.forEach(key => {
                const sectionData = JSON.parse(sessionStorage.getItem(key)) || {};
                const updatedSectionData = { ...sectionData, personId };
                sessionStorage.setItem(key, JSON.stringify(updatedSectionData));
            });
        
            // Define endpoints for each section
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
        
            // Send POST requests for each endpoint
            for (const [index, url] of endpoints.entries()) {
                const sectionKey = sections[index];
                const sectionData = JSON.parse(sessionStorage.getItem(sectionKey)) || {};
                try {
                    await axios.post(`http://localhost:3000/api/pds${url}`, sectionData);
                } catch (err) {
                    // Handle individual request errors
                    console.error(`Error posting ${sectionKey}:`, err.response ? err.response.data : err.message);
                    alert(`Failed to submit ${sectionKey}. Error: ${err.response ? err.response.data.error : err.message}`);
                    return; // Stop further execution on error
                }
            }
        
            // Update personalInfo with personId and save back to session storage
            const updatedPersonalInfo = { ...personalInfo, personId };
            sessionStorage.setItem('personalInfo', JSON.stringify(updatedPersonalInfo));
        
            // Validate and handle form submission
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
            <div className="mb-4">
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/PersonalInfo')}>Page 1</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Family')}>Page 2</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Educational')}>Page 3</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Eligibilty')}>Page 4</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/WorkExperience')}>Page 5</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/VoluntaryWork')}>Page 6</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/LearningDev')}>Page 7</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/OtherInfo')}>Page 8</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/RelationshipInfo')}>Page 9</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/References')}>Page 10</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Declaration')}>Page 11</button>
                        </li>
                    </ul>
                </nav>
            </div>

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
            </div>
        </div>
    );
}

export default Declaration;
