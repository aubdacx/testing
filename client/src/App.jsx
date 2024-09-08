import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import './App.css';
import Main from './pages/Main';
import Personalnfo from './pages/Personalnfo';
import Eligibility from './pages/Eligibility';
// import Page3 from './pages/Page3';
// import Page4 from './pages/Page4';
import AddPosition from './pages/AddPosition';
import ManageJob from './pages/ManageJob';
import ViewApplicant from './pages/ViewApplicant';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Personalnfo/:applicantId" element={<Personalnfo />} />
        <Route path="/Eligibility" element={<Eligibility />} />
        {/* <Route path="/Page3" element={<Page3 />} />
        <Route path="/Page4" element={<Page4 />} />  */}
        <Route path="/AddPosition" element={<AddPosition />} />
        <Route path="/ManageJob" element={<ManageJob />} />
        <Route path="/Applicant/:jobId" element={<ViewApplicant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
