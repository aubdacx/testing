import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import './App.css';
import Main from './pages/Main';
import Personalnfo from './pages/PersonalInfo';
import Family from './pages/Family';
import Educational from './pages/Educational';
import Eligibilty from './pages/Eligibilty';
import WorkExperience from './pages/WorkExperience';
import VoluntaryWork from './pages/VoluntaryWork';
import LearningDev from './pages/LearningDev';
import OtherInfo from './pages/OtherInfo';
import AddPosition from './pages/AddJobPosting';
import ManageJob from './pages/ManageJobPosting';
import ViewApplicant from './pages/ViewApplicant';
import Login from './pages/Login';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Personalnfo/:applicantId" element={<Personalnfo />} />
        <Route path="/Family" element={<Family />} />
        <Route path="/Educational" element={<Educational />} />
        <Route path="/Eligibilty" element={<Eligibilty />} />
        <Route path="/WorkExperience" element={<WorkExperience />} />
        <Route path="/VoluntaryWork" element={<VoluntaryWork />} />
        <Route path="/LearningDev" element={<LearningDev />} />
        <Route path="/OtherInfo" element={<OtherInfo />} />
        <Route path="/AddPosition" element={<AddPosition />} />
        <Route path="/ManageJob" element={<ManageJob />} />
        <Route path="/Applicant/:jobId" element={<ViewApplicant />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
