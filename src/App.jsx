import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from './components/Nav';
import Homepage from './components/Homepage';
import PostitContainer from './components/PostitContainer';

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
