import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import './App.css';
import Main from './pages/Main';
import Personalnfo from './pages/PDS/Personalnfo';
import Family from './pages/PDS/Family';
import Educational from './pages/PDS/Educational';
import Eligibilty from './pages/PDS/Eligibilty';
import WorkExperience from './pages/PDS/WorkExperience';
import VoluntaryWork from './pages/PDS/VoluntaryWork';
import LearningDev from './pages/PDS/LearningDev';
import OtherInfo from './pages/PDS/OtherInfo';
import RelationshipInfo from './pages/PDS/RelationshipInfo';
import References from './pages/PDS/References';
import Declaration from './pages/PDS/Declaration';
import AddPosition from './pages/AddPosition';
import ManageJob from './pages/ManageJob';
import ViewApplicant from './pages/ViewApplicant';
import DailyTimeRecord from './pages/DailyTimeRecord';
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
              <Route path="/RelationshipInfo" element={<RelationshipInfo />} />
              <Route path="/References" element={<References />} />
              <Route path="/Declaration" element={<Declaration />} />
        <Route path="/AddPosition" element={<AddPosition />} />
        <Route path="/ManageJob" element={<ManageJob />} />
        <Route path="/Applicant/:jobId" element={<ViewApplicant />} />
        <Route path="/DailyTimeRecord" element={<DailyTimeRecord />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
