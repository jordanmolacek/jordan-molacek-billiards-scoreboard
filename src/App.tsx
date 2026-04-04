import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Scoreboard from './components/Scoreboard';
import './App.css';

// Replace these with your actual published CSV URLs from Google Sheets
const CSV_URLS = {
  ryan: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4Xxio2fLl2_Y6tgc_xvOVV-L59SgnAnquAXZGDCQx5lVUcNqAMerHtMv3N2LJs1mrH79m4XGc_yQe/pubhtml?gid=0&single=true',
  other: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-placeholder-other/pub?output=csv'
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route 
              path="/ryan" 
              element={<Scoreboard csvUrl={CSV_URLS.ryan} opponentName="Ryan" />} 
            />
            <Route 
              path="/other" 
              element={<Scoreboard csvUrl={CSV_URLS.other} opponentName="Other" />} 
            />
            <Route path="/" element={<Navigate to="/ryan" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Jordan Molacek Billiards Scoreboard</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
