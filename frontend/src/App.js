import React from 'react';
import DiabetesPredictor from './components/DiabetesPredictor';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <DiabetesPredictor />
      </div>
    </div>
  );
}

export default App;