import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import './App.css';
import Main from './pages/Main';
import Personalnfo from './pages/PDS';
import Eligibility from './pages/Eligibility';
import AddPosition from './pages/AddJobPosting';
import ManageJob from './pages/ManageJobPosting';
import ViewApplicant from './pages/ViewApplicant';
import Login from './pages/Login';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/PDS" element={<Personalnfo />} />
        <Route path="/Eligibility" element={<Eligibility />} />
        {/* <Route path="/Page3" element={<Page3 />} />
        <Route path="/Page4" element={<Page4 />} />  */}
        <Route path="/AddPosition" element={<AddPosition />} />
        <Route path="/ManageJob" element={<ManageJob />} />
        <Route path="/Applicant/:jobId" element={<ViewApplicant />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
