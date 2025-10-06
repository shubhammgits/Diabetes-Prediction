import React from 'react';
import DiabetesPredictor from './components/DiabetesPredictor';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden font-['Poppins']">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <DiabetesPredictor />
      </div>
    </div>
  );
}

export default App;