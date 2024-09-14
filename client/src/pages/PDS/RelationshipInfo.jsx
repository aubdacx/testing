import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RelationshipInfo() {
    const [formData, setFormData] = useState({
        relativesInGovernment: { withinThirdDegree: '', withinFourthDegree: '', details: '' },
        administrativeOffenses: { foundGuilty: '', details: '' },
        criminalCharged: { charged: '', details: '', dateFiled: '', caseStatus: '' },
        courtConviction: { convicted: '', details: '' },
        separationFromService: { separated: '', details: '' },
        candidacyInElection: { candidate: '', details: '' },
        resignedForElection: { resigned: '', details: '' },
        immigrantStatus: { status: '', country: '' },
        indigenousGroup: { isMember: '', specify: '' },
        disability: { isDisabled: '', specify: '' },
        soloParent: { isSoloParent: '', specify: '' },
    });

    const navigate = useNavigate();

    const handleInputChange = (section, field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value,
            },
        }));
    };

    const handlePreviousClick = () => {
        navigate('/OtherInfo');
    };

    const handleNextClick = () => {
      let isFormValid = true;
  
      // Check if each section should be validated based on user responses
      if (formData.relativesInGovernment.withinThirdDegree === 'yes' || formData.relativesInGovernment.withinFourthDegree === 'yes') {
          if (formData.relativesInGovernment.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.administrativeOffenses.foundGuilty === 'yes') {
          if (formData.administrativeOffenses.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.criminalCharged.charged === 'yes') {
          if (formData.criminalCharged.dateFiled.trim() === '' || formData.criminalCharged.caseStatus.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.courtConviction.convicted === 'yes') {
          if (formData.courtConviction.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.separationFromService.separated === 'yes') {
          if (formData.separationFromService.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.candidacyInElection.candidate === 'yes') {
          if (formData.candidacyInElection.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.resignedForElection.resigned === 'yes') {
          if (formData.resignedForElection.details.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.immigrantStatus.status === 'yes') {
          if (formData.immigrantStatus.country.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.indigenousGroup.isMember === 'yes') {
          if (formData.indigenousGroup.specify.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.disability.isDisabled === 'yes') {
          if (formData.disability.specify.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (formData.soloParent.isSoloParent === 'yes') {
          if (formData.soloParent.specify.trim() === '') {
              isFormValid = false;
          }
      }
  
      if (isFormValid) {
          navigate('/References');
      } else {
          alert('Please fill out all applicable fields before proceeding.');
      }
  };
  
//   const handleNavigation = (page) => {
//     navigate(page);
// };

const [currentPage, setCurrentPage] = useState(9); 
const totalPages = 11; 

const handleNavigation = (path) => {
    navigate(path);
  };

    return (
        <div className="container mt-4">
       
            <div className="border p-4">
                {/* <h4 className="mt-4"><i>VIII. OTHER INFORMATION</i></h4> */}

                <label>34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the
        chief of bureau or office or to the person who has immediate supervision over you in the Office,
        Bureau or Department where you will be appointed?</label>
        <label>a. within the third degree</label>
        <div className="mb-3">
          <input type="radio" id="thirdDegreeYes" name="withinThirdDegree" value="yes" checked={formData.relativesInGovernment.withinThirdDegree === 'yes'} onChange={(e) => handleInputChange('relativesInGovernment', 'withinThirdDegree', e.target.value)} />
          <label htmlFor="thirdDegreeYes">Yes</label>
          <input type="radio" id="thirdDegreeNo" name="withinThirdDegree" value="no" checked={formData.relativesInGovernment.withinThirdDegree === 'no'} onChange={(e) => handleInputChange('relativesInGovernment', 'withinThirdDegree', e.target.value)} />
          <label htmlFor="thirdDegreeNo">No</label>
        </div>
        <div>
          <label>a. within the fourth degree (for Local Government Unit-Career employees)?</label>
          <input type="radio" id="fourthDegreeYes" name="withinFourthDegree" value="yes" checked={formData.relativesInGovernment.withinFourthDegree === 'yes'} onChange={(e) => handleInputChange('relativesInGovernment', 'withinFourthDegree', e.target.value)} />
          <label htmlFor="fourthDegreeYes">Yes</label>
          <input type="radio" id="fourthDegreeNo" name="withinFourthDegree" value="no" checked={formData.relativesInGovernment.withinFourthDegree === 'no'} onChange={(e) => handleInputChange('relativesInGovernment', 'withinFourthDegree', e.target.value)} />
          <label htmlFor="fourthDegreeNo">No</label>
          {(formData.relativesInGovernment.withinThirdDegree === 'yes' || formData.relativesInGovernment.withinFourthDegree === 'yes') && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.relativesInGovernment.details}
              onChange={(e) => handleInputChange('relativesInGovernment', 'details', e.target.value)}
            />
          )}
        </div>

        <label>35. a. Have you ever been found guilty of any administrative offense?</label>
        <div className="mb-3">
          <input type="radio" id="adminYes" name="foundGuilty" value="yes" checked={formData.administrativeOffenses.foundGuilty === 'yes'} onChange={(e) => handleInputChange('administrativeOffenses', 'foundGuilty', e.target.value)} />
          <label htmlFor="adminYes">Yes</label>
          <input type="radio" id="adminNo" name="foundGuilty" value="no" checked={formData.administrativeOffenses.foundGuilty === 'no'} onChange={(e) => handleInputChange('administrativeOffenses', 'foundGuilty', e.target.value)} />
          <label htmlFor="adminNo">No</label>
          {formData.administrativeOffenses.foundGuilty === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.administrativeOffenses.details}
              onChange={(e) => handleInputChange('administrativeOffenses', 'details', e.target.value)}
            />
          )}
        </div>
        <label> b. Have you been criminally charged before any court?</label>
<div className="mb-3">
  <input
    type="radio"
    id="chargedYes"
    name="charged"
    value="yes"
    checked={formData.criminalCharged.charged === 'yes'}
    onChange={(e) => handleInputChange('criminalCharged', 'charged', e.target.value)}
  />
  <label htmlFor="chargedYes">Yes</label>
  
  <input
    type="radio"
    id="chargedNo"
    name="charged"
    value="no"
    checked={formData.criminalCharged.charged === 'no'}
    onChange={(e) => handleInputChange('criminalCharged', 'charged', e.target.value)}
  />
  <label htmlFor="chargedNo">No</label>

  {formData.criminalCharged.charged === 'yes' && (
    <div className="mt-2">
      {/* Additional fields for "Yes" response */}
    
      <input
     
        type="date"
        className="form-control mb-2"
        placeholder="Date Filed"
        value={formData.criminalCharged.dateFiled}
        onChange={(e) => handleInputChange('criminalCharged', 'dateFiled', e.target.value)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Status of Case/s"
        value={formData.criminalCharged.caseStatus}
        onChange={(e) => handleInputChange('criminalCharged', 'caseStatus', e.target.value)}
      />
    </div>
  )}
</div>

<label>36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?</label>
        <div className="mb-3">
          <input type="radio" id="convictedYes" name="convicted" value="yes" checked={formData.courtConviction.convicted === 'yes'} onChange={(e) => handleInputChange('courtConviction', 'convicted', e.target.value)} />
          <label htmlFor="convictedYes">Yes</label>
          <input type="radio" id="convictedNo" name="convicted" value="no" checked={formData.courtConviction.convicted === 'no'} onChange={(e) => handleInputChange('courtConviction', 'convicted', e.target.value)} />
          <label htmlFor="convictedNo">No</label>
          {formData.courtConviction.convicted === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.courtConviction.details}
              onChange={(e) => handleInputChange('courtConviction', 'details', e.target.value)}
            />
          )}
        </div>

        <label>37. Have you ever been separated from the service in any of the following modes?</label>
        <div className="mb-3">
          <input type="radio" id="separatedYes" name="separated" value="yes" checked={formData.separationFromService.separated === 'yes'} onChange={(e) => handleInputChange('separationFromService', 'separated', e.target.value)} />
          <label htmlFor="separatedYes">Yes</label>
          <input type="radio" id="separatedNo" name="separated" value="no" checked={formData.separationFromService.separated === 'no'} onChange={(e) => handleInputChange('separationFromService', 'separated', e.target.value)} />
          <label htmlFor="separatedNo">No</label>
          {formData.separationFromService.separated === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.separationFromService.details}
              onChange={(e) => handleInputChange('separationFromService', 'details', e.target.value)}
            />
          )}
        </div>

        <label>38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</label>
        <div className="mb-3">
          <input type="radio" id="candidateYes" name="candidate" value="yes" checked={formData.candidacyInElection.candidate === 'yes'} onChange={(e) => handleInputChange('candidacyInElection', 'candidate', e.target.value)} />
          <label htmlFor="candidateYes">Yes</label>
          <input type="radio" id="candidateNo" name="candidate" value="no" checked={formData.candidacyInElection.candidate === 'no'} onChange={(e) => handleInputChange('candidacyInElection', 'candidate', e.target.value)} />
          <label htmlFor="candidateNo">No</label>
          {formData.candidacyInElection.candidate === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.candidacyInElection.details}
              onChange={(e) => handleInputChange('candidacyInElection', 'details', e.target.value)}
            />
          )}
        </div>

        <label>b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</label>
        <div className="mb-3">
          <input type="radio" id="resignedYes" name="resigned" value="yes" checked={formData.resignedForElection.resigned === 'yes'} onChange={(e) => handleInputChange('resignedForElection', 'resigned', e.target.value)} />
          <label htmlFor="resignedYes">Yes</label>
          <input type="radio" id="resignedNo" name="resigned" value="no" checked={formData.resignedForElection.resigned === 'no'} onChange={(e) => handleInputChange('resignedForElection', 'resigned', e.target.value)} />
          <label htmlFor="resignedNo">No</label>
          {formData.resignedForElection.resigned === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.resignedForElection.details}
              onChange={(e) => handleInputChange('resignedForElection', 'details', e.target.value)}
            />
          )}
        </div>

        <label>39. Have you acquired the status of an immigrant or permanent resident of another country?</label>
        <div className="mb-3">
          <input type="radio" id="immigrantYes" name="status" value="yes" checked={formData.immigrantStatus.status === 'yes'} onChange={(e) => handleInputChange('immigrantStatus', 'status', e.target.value)} />
          <label htmlFor="immigrantYes">Yes</label>
          <input type="radio" id="immigrantNo" name="status" value="no" checked={formData.immigrantStatus.status === 'no'} onChange={(e) => handleInputChange('immigrantStatus', 'status', e.target.value)} />
          <label htmlFor="immigrantNo">No</label>
          {formData.immigrantStatus.status === 'yes' && (
            <div className="mt-2">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Country"
                value={formData.immigrantStatus.country}
                onChange={(e) => handleInputChange('immigrantStatus', 'country', e.target.value)}
              />
            </div>
          )}
        </div>

        <label>40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA
            7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following</label>
        <div className="mb-3">
            <label> a. Are you a member of any indigenous group?</label>
            <div></div>
          <input type="radio" id="indigenousYes" name="indigenous" value="yes" checked={formData.indigenousGroup.isMember === 'yes'} onChange={(e) => handleInputChange('indigenousGroup', 'isMember', e.target.value)} />
          <label htmlFor="indigenousYes">Yes</label>
          <input type="radio" id="indigenousNo" name="indigenous" value="no" checked={formData.indigenousGroup.isMember === 'no'} onChange={(e) => handleInputChange('indigenousGroup', 'isMember', e.target.value)} />
          <label htmlFor="indigenousNo">No</label>
          {formData.indigenousGroup.isMember === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify"
              value={formData.indigenousGroup.specify}
              onChange={(e) => handleInputChange('indigenousGroup', 'specify', e.target.value)}
            />
          )}
        </div>
        <div className="mb-3">
          <label> b. Are you a person with disability?</label>
          <div>
            <input type="radio" id="pwdYes" name="pwd" value="yes" checked={formData.disability.isDisabled === 'yes'} onChange={(e) => handleInputChange('disability', 'isDisabled', e.target.value)} />
            <label htmlFor="pwdYes">Yes</label>
            <input type="radio" id="pwdNo" name="pwd" value="no" checked={formData.disability.isDisabled === 'no'} onChange={(e) => handleInputChange('disability', 'isDisabled', e.target.value)} />
            <label htmlFor="pwdNo">No</label>
          </div>
          {formData.disability.isDisabled === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify ID No."
              value={formData.disability.specify}
              onChange={(e) => handleInputChange('disability', 'specify', e.target.value)}
            />
          )}
        </div>

        <div className="mb-3">
          <label> c. Are you a solo parent?</label>
          <div>
            <input type="radio" id="soloParentYes" name="soloParent" value="yes" checked={formData.soloParent.isSoloParent === 'yes'} onChange={(e) => handleInputChange('soloParent', 'isSoloParent', e.target.value)} />
            <label htmlFor="soloParentYes">Yes</label>
            <input type="radio" id="soloParentNo" name="soloParent" value="no" checked={formData.soloParent.isSoloParent === 'no'} onChange={(e) => handleInputChange('soloParent', 'isSoloParent', e.target.value)} />
            <label htmlFor="soloParentNo">No</label>
          </div>
          {formData.soloParent.isSoloParent === 'yes' && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify ID No."
              value={formData.soloParent.specify}
              onChange={(e) => handleInputChange('soloParent', 'specify', e.target.value)}
            />
          )}
        </div>
                {/* <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-primary me-2" onClick={handlePreviousClick}>
                        Previous
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNextClick}>
                        Next
                    </button>
                </div> */}

<ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/OtherInfo')}>
              &lt;
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Personalnfo/:applicantId')}>1</button>
          </li>
          <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Family')}>2</button>
          </li>
          <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Educational')}>3</button>
          </li>
          <li className={`page-item ${currentPage === 4 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleNavigation('/Eligibilty')}>4</button>
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
          <li className="page-item">
            <button className="page-link"  onClick={() => handleNavigation('/References')}>
              &gt;
            </button>
          </li>
        </ul>
            </div>
        </div>
    );
}

export default RelationshipInfo;
