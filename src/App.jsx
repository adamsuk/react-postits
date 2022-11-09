import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from './Nav';
import Homepage from './Homepage';
import PostitContainer from './PostitContainer';

import './App.css';

const App = () => (
  <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/:workspaceId" element={<PostitContainer />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  </>
);

export default App;
