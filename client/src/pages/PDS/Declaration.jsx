import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';

function Declaration() {
    const [formData, setFormData] = useState({
        govID: { idType: '', idNumber: '', datePlace: '' },
        signatureDate: '',
        photoUploaded: false,
        thumbmarkUploaded: false,
        swornDate: '',
        oathPerson: '',
    });

    const sigCanvas = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (section, field, value) => {
        if (section === 'govID') {
            setFormData({
                ...formData,
                govID: { ...formData.govID, [field]: value }
            });
        } else {
            setFormData({ ...formData, [section]: value });
        }
    };

    const handleClear = () => {
        sigCanvas.current.clear();
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

    const validateForm = () => {
        const { govID, signatureDate, photoUploaded, thumbmarkUploaded, swornDate, oathPerson } = formData;
        return (
            govID.idType &&
            govID.idNumber &&
            govID.datePlace &&
            signatureDate &&
            photoUploaded &&
            thumbmarkUploaded &&
            swornDate &&
            oathPerson
        );
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Add form submission logic here
            alert('Form submitted successfully!');
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="container mt-4">
            {/* Navigation Bar */}
            <div className="mb-4">
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-link" onClick={() => handleNavigation('/Personalnfo/:applicantId')}>Page 1</button>
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
                            value={formData.govID.idType}
                            onChange={(e) => handleInputChange('govID', 'idType', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ID/License/Passport No."
                            value={formData.govID.idNumber}
                            onChange={(e) => handleInputChange('govID', 'idNumber', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Date/Place of Issuance"
                            value={formData.govID.datePlace}
                            onChange={(e) => handleInputChange('govID', 'datePlace', e.target.value)}
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
                            value={formData.signatureDate}
                            onChange={(e) => handleInputChange('signatureDate', '', e.target.value)}
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
                        <p>
                            SUBSCRIBED AND SWORN to before me this 
                            <input
                                type="date"
                                className="form-control d-inline mx-2"
                                style={{ width: 'auto', display: 'inline-block' }}
                                value={formData.swornDate}
                                onChange={(e) => handleInputChange('swornDate', '', e.target.value)}
                            />, 
                            affiant exhibiting his/her validly issued government ID as indicated above.
                        </p>
                    </div>

                    <div className="border p-3 mb-3" style={{ height: '100px' }}>
                        <input
                            type="text"
                            className="form-control text-center"
                            value={formData.oathPerson}
                            onChange={(e) => handleInputChange('oathPerson', '', e.target.value)}
                        />
                        <p className="text-center">Person Administering Oath</p>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-primary me-2" onClick={() => handleNavigation('/References')}>
                        Previous
                    </button>
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Declaration;
