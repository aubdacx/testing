import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

function OtherInfo() {
  const [formData, setFormData] = useState({
    otherInformation: {
      specialSkills: [""],
      nonAcademicDistinctions: [""],
      membershipInOrganizations: [""],
    },
    relativesInGovernment: {
      withinThirdDegree: "",
      withinFourthDegree: "",
      details: "",
    },
    administrativeOffenses: { foundGuilty: "", details: "" },
    criminalCharged: {
      charged: "",
      details: "",
      dateFiled: "",
      caseStatus: "",
    },
    courtConviction: { convicted: "", details: "" },
    separationFromService: { separated: "", details: "" },
    candidacyInElection: { candidate: "", details: "" },
    resignedForElection: { resigned: "", details: "" },
    immigrantStatus: { status: "", country: "" },
    indigenousGroup: { isMember: "", specify: "" },
    disability: { isDisabled: "", specify: "" },
    soloParent: { isSoloParent: "", specify: "" },
    references: [{ name: "", address: "", telephone: "" }],
    govID: { idType: "", idNumber: "", datePlace: "" },
    signatureDate: "",
    photoUploaded: false,
  });

  const sigCanvas = useRef(null);
  const navigate = useNavigate();

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  const handleSignatureEnd = () => {
    // Implement logic if needed when signature ends
  };

  const handleOtherInformationChange = (section, index, e) => {
    const { value } = e.target;
    const updatedFields = [...formData.otherInformation[section]];
    updatedFields[index] = value;
    setFormData({
      ...formData,
      otherInformation: {
        ...formData.otherInformation,
        [section]: updatedFields,
      },
    });
  };

  const handleAddField = (section) => {
    setFormData({
      ...formData,
      otherInformation: {
        ...formData.otherInformation,
        [section]: [...formData.otherInformation[section], ""],
      },
    });
  };

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };
  const handleSignatureDateChange=(Value)=> {
    setFormData({...formData, signatureDate: Value});
  }

  const handleArrayChange = (section, index, field, value) => {
    const updatedFields = [...formData[section]];
    updatedFields[index][field] = value;
    setFormData({ ...formData, [section]: updatedFields });
  };

  const handleSubmit = async () => {
    // Implement validation logic here
    sessionStorage.setItem("OtherInfo", JSON.stringify(formData));
    const personalInfo = JSON.parse(sessionStorage.getItem("personalInfo"));
    const response = await fetch(
      "http://localhost:3000/api/pds/personal-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
      }
    );
    console.log("Form submitted", formData);
    const result = await response.json();

    // Check if the personId is returned
    if (result.personId) {
      // Store the personId in session storage
      sessionStorage.setItem("personId", result.personId);
      addRemainingDetails();
      console.log("personId saved to session storage:", result.personId);
    } else {
      console.error("personId not found in response");
    }
    // Implement form submission logic here
  };
  // Function to post family background
  const postFamilyBackground = async (personId, familyBackground) => {
    try {
      const response = await axios.post(`${BASE_URL}family-background`, {
        ...familyBackground,
        personId,
      });
      console.log("Family Background saved:", response.data);
    } catch (error) {
      console.error("Error posting family background:", error);
      throw error;
    }
  };

  // Function to post educational background
  const postEducationalBackground = async (personId, educationalBackground) => {
    try {
      const response = await axios.post(`${BASE_URL}educational-background`, {
        ...educationalBackground,
        personId,
      });
      console.log("Educational Background saved:", response.data);
    } catch (error) {
      console.error("Error posting educational background:", error);
      throw error;
    }
  };

  // Function to post work experience
  const postWorkExperience = async (personId, workExperience) => {
    try {
      const response = await axios.post(`${BASE_URL}work-experience`, {
        ...workExperience,
        personId,
      });
      console.log("Work Experience saved:", response.data);
    } catch (error) {
      console.error("Error posting work experience:", error);
      throw error;
    }
  };

  // Function to post civil service eligibility
  const postCivilServiceEligibility = async (
    personId,
    civilServiceEligibility
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}civil-service-eligibility`,
        { ...civilServiceEligibility, personId }
      );
      console.log("Civil Service Eligibility saved:", response.data);
    } catch (error) {
      console.error("Error posting civil service eligibility:", error);
      throw error;
    }
  };

  // Function to post voluntary work
  const postVoluntaryWork = async (personId, voluntaryWork) => {
    try {
      const response = await axios.post(`${BASE_URL}voluntary-work`, {
        ...voluntaryWork,
        personId,
      });
      console.log("Voluntary Work saved:", response.data);
    } catch (error) {
      console.error("Error posting voluntary work:", error);
      throw error;
    }
  };

  // Function to post learning and development
  const postLearningAndDevelopment = async (
    personId,
    learningAndDevelopment
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}learning-and-development`, {
        ...learningAndDevelopment,
        personId,
      });
      console.log("Learning and Development saved:", response.data);
    } catch (error) {
      console.error("Error posting learning and development:", error);
      throw error;
    }
  };

  // Function to post other information
  const postOtherInformation = async (personId, otherInformation) => {
    try {
      const response = await axios.post(`${BASE_URL}other-information`, {
        ...otherInformation,
        personId,
      });
      console.log("Other Information saved:", response.data);
    } catch (error) {
      console.error("Error posting other information:", error);
      throw error;
    }
  };
  const addRemainingDetails = async () => {
    try {
      const personId = JSON.parse(sessionStorage.getItem("personId"));
      const personalInfo = JSON.parse(sessionStorage.getItem("personalInfo"));
      const familyBackground = JSON.parse(sessionStorage.getItem("FamilyBG"));
      const educationalBackground = JSON.parse(
        sessionStorage.getItem("EducationalBG")
      );
      const workExperience = JSON.parse(
        sessionStorage.getItem("WorkExperience")
      );
      const civilServiceEligibility = JSON.parse(
        sessionStorage.getItem("Eligibility")
      );
      const voluntaryWork = JSON.parse(sessionStorage.getItem("VoluntaryWork"));
      const learningAndDevelopment = JSON.parse(
        sessionStorage.getItem("LearningDev")
      );
      const otherInformation = JSON.parse(sessionStorage.getItem("OtherInfo"));

      if (!personalInfo) throw new Error("Personal info is missing");

      if (familyBackground)
        await postFamilyBackground(personId, familyBackground);
      if (educationalBackground)
        await postEducationalBackground(personId, educationalBackground);
      if (workExperience) await postWorkExperience(personId, workExperience);
      if (civilServiceEligibility)
        await postCivilServiceEligibility(personId, civilServiceEligibility);
      if (voluntaryWork) await postVoluntaryWork(personId, voluntaryWork);
      if (learningAndDevelopment)
        await postLearningAndDevelopment(personId, learningAndDevelopment);
      if (otherInformation)
        await postOtherInformation(personId, otherInformation);
      sessionStorage.clear();
      console.log("All data submitted successfully");
      alert("PDS form Submitted")
    } catch (error) {
      console.error("Error submitting all data:", error);
    }
  };

  const handlePreviousClick = () => {
    navigate("/LearningDev");
  };

  const handlePhotoUpload = (e) => {
    // In a real application, you'd handle the file upload here
    setFormData({ ...formData, photoUploaded: true });
  };

  return (
    <div className="container mt-4">
      <div className="border p-4">
        <h4 className="mt-4">
          <i>VIII. OTHER INFORMATION</i>
        </h4>
        {Object.keys(formData.otherInformation).map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {formData.otherInformation[section].map((field, index) => (
              <div key={index} className="row mb-3 align-items-center">
                <div className="col-md-10">
                  <label className="form-label">
                    {section === "specialSkills"
                      ? "31. Special Skills and Hobbies"
                      : section === "nonAcademicDistinctions"
                      ? "32. Non-Academic Distinctions/Recognition"
                      : "33. Membership in Association/Organization"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={field}
                    onChange={(e) =>
                      handleOtherInformationChange(section, index, e)
                    }
                    style={{ border: "1px solid #ced4da" }}
                  />
                </div>
                <div className="col-md-2 text-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleAddField(section)}
                  >
                    Add{" "}
                    {section === "specialSkills"
                      ? "Skill/Hobby"
                      : section === "nonAcademicDistinctions"
                      ? "Distinction"
                      : "Membership"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Additional Fields from the image */}
        <label>
          34. Are you related by consanguinity or affinity to the appointing or
          recommending authority, or to the chief of bureau or office or to the
          person who has immediate supervision over you in the Office, Bureau or
          Department where you will be appointed?
        </label>
        <label>a. within the third degree</label>
        <div className="mb-3">
          <input
            type="radio"
            id="thirdDegreeYes"
            name="withinThirdDegree"
            value="yes"
            checked={formData.relativesInGovernment.withinThirdDegree === "yes"}
            onChange={(e) =>
              handleInputChange(
                "relativesInGovernment",
                "withinThirdDegree",
                e.target.value
              )
            }
          />
          <label htmlFor="thirdDegreeYes">Yes</label>
          <input
            type="radio"
            id="thirdDegreeNo"
            name="withinThirdDegree"
            value="no"
            checked={formData.relativesInGovernment.withinThirdDegree === "no"}
            onChange={(e) =>
              handleInputChange(
                "relativesInGovernment",
                "withinThirdDegree",
                e.target.value
              )
            }
          />
          <label htmlFor="thirdDegreeNo">No</label>
        </div>
        <div>
          <label>
            a. within the fourth degree (for Local Government Unit-Career
            employees)?
          </label>
          <input
            type="radio"
            id="fourthDegreeYes"
            name="withinFourthDegree"
            value="yes"
            checked={
              formData.relativesInGovernment.withinFourthDegree === "yes"
            }
            onChange={(e) =>
              handleInputChange(
                "relativesInGovernment",
                "withinFourthDegree",
                e.target.value
              )
            }
          />
          <label htmlFor="fourthDegreeYes">Yes</label>
          <input
            type="radio"
            id="fourthDegreeNo"
            name="withinFourthDegree"
            value="no"
            checked={formData.relativesInGovernment.withinFourthDegree === "no"}
            onChange={(e) =>
              handleInputChange(
                "relativesInGovernment",
                "withinFourthDegree",
                e.target.value
              )
            }
          />
          <label htmlFor="fourthDegreeNo">No</label>
          {(formData.relativesInGovernment.withinThirdDegree === "yes" ||
            formData.relativesInGovernment.withinFourthDegree === "yes") && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.relativesInGovernment.details}
              onChange={(e) =>
                handleInputChange(
                  "relativesInGovernment",
                  "details",
                  e.target.value
                )
              }
            />
          )}
        </div>

        <label>
          35. a. Have you ever been found guilty of any administrative offense?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="adminYes"
            name="foundGuilty"
            value="yes"
            checked={formData.administrativeOffenses.foundGuilty === "yes"}
            onChange={(e) =>
              handleInputChange(
                "administrativeOffenses",
                "foundGuilty",
                e.target.value
              )
            }
          />
          <label htmlFor="adminYes">Yes</label>
          <input
            type="radio"
            id="adminNo"
            name="foundGuilty"
            value="no"
            checked={formData.administrativeOffenses.foundGuilty === "no"}
            onChange={(e) =>
              handleInputChange(
                "administrativeOffenses",
                "foundGuilty",
                e.target.value
              )
            }
          />
          <label htmlFor="adminNo">No</label>
          {formData.administrativeOffenses.foundGuilty === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.administrativeOffenses.details}
              onChange={(e) =>
                handleInputChange(
                  "administrativeOffenses",
                  "details",
                  e.target.value
                )
              }
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
            checked={formData.criminalCharged.charged === "yes"}
            onChange={(e) =>
              handleInputChange("criminalCharged", "charged", e.target.value)
            }
          />
          <label htmlFor="chargedYes">Yes</label>

          <input
            type="radio"
            id="chargedNo"
            name="charged"
            value="no"
            checked={formData.criminalCharged.charged === "no"}
            onChange={(e) =>
              handleInputChange("criminalCharged", "charged", e.target.value)
            }
          />
          <label htmlFor="chargedNo">No</label>

          {formData.criminalCharged.charged === "yes" && (
            <div className="mt-2">
              {/* Additional fields for "Yes" response */}

              <input
                type="date"
                className="form-control mb-2"
                placeholder="Date Filed"
                value={formData.criminalCharged.dateFiled}
                onChange={(e) =>
                  handleInputChange(
                    "criminalCharged",
                    "dateFiled",
                    e.target.value
                  )
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="Status of Case/s"
                value={formData.criminalCharged.caseStatus}
                onChange={(e) =>
                  handleInputChange(
                    "criminalCharged",
                    "caseStatus",
                    e.target.value
                  )
                }
              />
            </div>
          )}
        </div>

        <label>
          36. Have you ever been convicted of any crime or violation of any law,
          decree, ordinance or regulation by any court or tribunal?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="convictedYes"
            name="convicted"
            value="yes"
            checked={formData.courtConviction.convicted === "yes"}
            onChange={(e) =>
              handleInputChange("courtConviction", "convicted", e.target.value)
            }
          />
          <label htmlFor="convictedYes">Yes</label>
          <input
            type="radio"
            id="convictedNo"
            name="convicted"
            value="no"
            checked={formData.courtConviction.convicted === "no"}
            onChange={(e) =>
              handleInputChange("courtConviction", "convicted", e.target.value)
            }
          />
          <label htmlFor="convictedNo">No</label>
          {formData.courtConviction.convicted === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.courtConviction.details}
              onChange={(e) =>
                handleInputChange("courtConviction", "details", e.target.value)
              }
            />
          )}
        </div>

        <label>
          37. Have you ever been separated from the service in any of the
          following modes?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="separatedYes"
            name="separated"
            value="yes"
            checked={formData.separationFromService.separated === "yes"}
            onChange={(e) =>
              handleInputChange(
                "separationFromService",
                "separated",
                e.target.value
              )
            }
          />
          <label htmlFor="separatedYes">Yes</label>
          <input
            type="radio"
            id="separatedNo"
            name="separated"
            value="no"
            checked={formData.separationFromService.separated === "no"}
            onChange={(e) =>
              handleInputChange(
                "separationFromService",
                "separated",
                e.target.value
              )
            }
          />
          <label htmlFor="separatedNo">No</label>
          {formData.separationFromService.separated === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.separationFromService.details}
              onChange={(e) =>
                handleInputChange(
                  "separationFromService",
                  "details",
                  e.target.value
                )
              }
            />
          )}
        </div>

        <label>
          38. a. Have you ever been a candidate in a national or local election
          held within the last year (except Barangay election)?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="candidateYes"
            name="candidate"
            value="yes"
            checked={formData.candidacyInElection.candidate === "yes"}
            onChange={(e) =>
              handleInputChange(
                "candidacyInElection",
                "candidate",
                e.target.value
              )
            }
          />
          <label htmlFor="candidateYes">Yes</label>
          <input
            type="radio"
            id="candidateNo"
            name="candidate"
            value="no"
            checked={formData.candidacyInElection.candidate === "no"}
            onChange={(e) =>
              handleInputChange(
                "candidacyInElection",
                "candidate",
                e.target.value
              )
            }
          />
          <label htmlFor="candidateNo">No</label>
          {formData.candidacyInElection.candidate === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.candidacyInElection.details}
              onChange={(e) =>
                handleInputChange(
                  "candidacyInElection",
                  "details",
                  e.target.value
                )
              }
            />
          )}
        </div>

        <label>
          b. Have you resigned from the government service during the three
          (3)-month period before the last election to promote/actively campaign
          for a national or local candidate?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="resignedYes"
            name="resigned"
            value="yes"
            checked={formData.resignedForElection.resigned === "yes"}
            onChange={(e) =>
              handleInputChange(
                "resignedForElection",
                "resigned",
                e.target.value
              )
            }
          />
          <label htmlFor="resignedYes">Yes</label>
          <input
            type="radio"
            id="resignedNo"
            name="resigned"
            value="no"
            checked={formData.resignedForElection.resigned === "no"}
            onChange={(e) =>
              handleInputChange(
                "resignedForElection",
                "resigned",
                e.target.value
              )
            }
          />
          <label htmlFor="resignedNo">No</label>
          {formData.resignedForElection.resigned === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Details"
              value={formData.resignedForElection.details}
              onChange={(e) =>
                handleInputChange(
                  "resignedForElection",
                  "details",
                  e.target.value
                )
              }
            />
          )}
        </div>

        <label>
          39. Have you acquired the status of an immigrant or permanent resident
          of another country?
        </label>
        <div className="mb-3">
          <input
            type="radio"
            id="immigrantYes"
            name="status"
            value="yes"
            checked={formData.immigrantStatus.status === "yes"}
            onChange={(e) =>
              handleInputChange("immigrantStatus", "status", e.target.value)
            }
          />
          <label htmlFor="immigrantYes">Yes</label>
          <input
            type="radio"
            id="immigrantNo"
            name="status"
            value="no"
            checked={formData.immigrantStatus.status === "no"}
            onChange={(e) =>
              handleInputChange("immigrantStatus", "status", e.target.value)
            }
          />
          <label htmlFor="immigrantNo">No</label>
          {formData.immigrantStatus.status === "yes" && (
            <div className="mt-2">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Country"
                value={formData.immigrantStatus.country}
                onChange={(e) =>
                  handleInputChange(
                    "immigrantStatus",
                    "country",
                    e.target.value
                  )
                }
              />
            </div>
          )}
        </div>

        <label>
          40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna
          Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act
          of 2000 (RA 8972), please answer the following
        </label>
        <div className="mb-3">
          <label> a. Are you a member of any indigenous group?</label>
          <div></div>
          <input
            type="radio"
            id="indigenousYes"
            name="indigenous"
            value="yes"
            checked={formData.indigenousGroup.isMember === "yes"}
            onChange={(e) =>
              handleInputChange("indigenousGroup", "isMember", e.target.value)
            }
          />
          <label htmlFor="indigenousYes">Yes</label>
          <input
            type="radio"
            id="indigenousNo"
            name="indigenous"
            value="no"
            checked={formData.indigenousGroup.isMember === "no"}
            onChange={(e) =>
              handleInputChange("indigenousGroup", "isMember", e.target.value)
            }
          />
          <label htmlFor="indigenousNo">No</label>
          {formData.indigenousGroup.isMember === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify"
              value={formData.indigenousGroup.specify}
              onChange={(e) =>
                handleInputChange("indigenousGroup", "specify", e.target.value)
              }
            />
          )}
        </div>
        <div className="mb-3">
          <label> b. Are you a person with disability?</label>
          <div>
            <input
              type="radio"
              id="pwdYes"
              name="pwd"
              value="yes"
              checked={formData.disability.isDisabled === "yes"}
              onChange={(e) =>
                handleInputChange("disability", "isDisabled", e.target.value)
              }
            />
            <label htmlFor="pwdYes">Yes</label>
            <input
              type="radio"
              id="pwdNo"
              name="pwd"
              value="no"
              checked={formData.disability.isDisabled === "no"}
              onChange={(e) =>
                handleInputChange("disability", "isDisabled", e.target.value)
              }
            />
            <label htmlFor="pwdNo">No</label>
          </div>
          {formData.disability.isDisabled === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify ID No."
              value={formData.disability.specify}
              onChange={(e) =>
                handleInputChange("disability", "specify", e.target.value)
              }
            />
          )}
        </div>

        <div className="mb-3">
          <label> c. Are you a solo parent?</label>
          <div>
            <input
              type="radio"
              id="soloParentYes"
              name="soloParent"
              value="yes"
              checked={formData.soloParent.isSoloParent === "yes"}
              onChange={(e) =>
                handleInputChange("soloParent", "isSoloParent", e.target.value)
              }
            />
            <label htmlFor="soloParentYes">Yes</label>
            <input
              type="radio"
              id="soloParentNo"
              name="soloParent"
              value="no"
              checked={formData.soloParent.isSoloParent === "no"}
              onChange={(e) =>
                handleInputChange("soloParent", "isSoloParent", e.target.value)
              }
            />
            <label htmlFor="soloParentNo">No</label>
          </div>
          {formData.soloParent.isSoloParent === "yes" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Specify ID No."
              value={formData.soloParent.specify}
              onChange={(e) =>
                handleInputChange("soloParent", "specify", e.target.value)
              }
            />
          )}
        </div>
        <label>
          41. References (Person not related by consanguinity or affinity to
          applicant/appointee)
        </label>
        {formData.references.map((reference, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={reference.name}
                onChange={(e) =>
                  handleArrayChange("references", index, "name", e.target.value)
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={reference.address}
                onChange={(e) =>
                  handleArrayChange(
                    "references",
                    index,
                    "address",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Telephone"
                value={reference.telephone}
                onChange={(e) =>
                  handleArrayChange(
                    "references",
                    index,
                    "telephone",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mb-4"
          onClick={() =>
            setFormData({
              ...formData,
              references: [
                ...formData.references,
                { name: "", address: "", telephone: "" },
              ],
            })
          }
        >
          Add Reference
        </button>
        <div></div>

        <div className="row">
          <div className="col-md-8">
            <label>
              42. I declare under oath that I have personally accomplished this
              Personal Data Sheet which is a true, correct and complete
              statement pursuant to the provisions of pertinent laws, rules and
              regulations of the Republic of the Philippines. I authorize the
              agency head/authorized representative to verify/validate the
              contents stated herein. I agree that any misrepresentation made in
              this document and its attachments shall cause the filing of
              administrative/criminal case/s against me.
            </label>

            <div className="mt-3">
              <label>
                Government Issued ID (i.e. Passport, GSIS, SSS, PRC, Driver's
                License, etc.)
              </label>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Government Issued ID"
                  value={formData.govID.idType}
                  onChange={(e) =>
                    handleInputChange("govID", "idType", e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID/License/Passport No.:"
                  value={formData.govID.idNumber}
                  onChange={(e) =>
                    handleInputChange("govID", "idNumber", e.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Date/Place of Issuance:"
                  value={formData.govID.datePlace}
                  onChange={(e) =>
                    handleInputChange("govID", "datePlace", e.target.value)
                  }
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
                      className: "signature-canvas",
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
            </div>

            <div className="mb-8">
              <input
                type="date"
                className="form-control"
                placeholder="Date Accomplished"
                onChange={(e) =>
                  handleSignatureDateChange("signatureDate", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-3 mb-3">
              <p>
                ID picture taken within the last 6 months 4.5 cm. X 3.5 cm
                (passport size)
              </p>
              <p>Computer generated or photocopied picture is not acceptable</p>
              <div className="border p-3 mb-3" style={{ height: "200px" }}>
                {formData.photoUploaded ? (
                  <p>Photo uploaded</p>
                ) : (
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    accept="image/*"
                  />
                )}
              </div>
              <p className="text-center">PHOTO</p>
            </div>
            <div className="border p-3 mb-3" style={{ height: "100px" }}>
              <p className="text-center">Right Thumbmark</p>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p>
            SUBSCRIBED AND SWORN to before me this
            ______________________________, affiant exhibiting his/her validly
            issued government ID as indicated above.
          </p>
          <div className="border p-3 mb-3" style={{ height: "100px" }}>
            <p className="text-center">Person Administering Oath</p>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtherInfo;
