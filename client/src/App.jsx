import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import './App.css';
import Main from './pages/Main';
import Personalnfo from './pages/Personalnfo';
// import Page2 from './pages/Page2';
// import Page3 from './pages/Page3';
// import Page4 from './pages/Page4';
import AddPosition from './pages/AddPosition';
import ManageJob from './pages/ManageJob';
// import EditJob from './pages/EditJob';
// import Applicants from './pages/Applicants';
import ViewApplicant from './pages/ViewApplicant';
function App() {

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Personalnfo/:applicantId" element={<Personalnfo />} />
        {/* <Route path="/Page2" element={<Page2 />} />
        <Route path="/Page3" element={<Page3 />} />
        <Route path="/Page4" element={<Page4 />} /> */}
        <Route path="/AddPosition" element={<AddPosition />} />
        <Route path="/ManageJob" element={<ManageJob />} />
        {/* <Route path="/EditJob" element={<EditJob />} /> */}
        {/* <Route path="/Applicants" element={<Applicants />} /> */}
        <Route path="/ViewApplicant/:jobId" element={<ViewApplicant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
