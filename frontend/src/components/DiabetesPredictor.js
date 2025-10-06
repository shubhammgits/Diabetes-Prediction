import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CreatorBadge from './CreatorBadge';

const DiabetesPredictor = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const requestData = {
        Pregnancies: parseInt(formData.Pregnancies) || 0,
        Glucose: parseInt(formData.Glucose) || 0,
        BloodPressure: parseInt(formData.BloodPressure) || 0,
        SkinThickness: parseInt(formData.SkinThickness) || 0,
        Insulin: parseInt(formData.Insulin) || 0,
        BMI: parseFloat(formData.BMI) || 0,
        DiabetesPedigreeFunction: parseFloat(formData.DiabetesPedigreeFunction) || 0,
        Age: parseInt(formData.Age) || 0
      };

      const response = await axios.post('/diabetes_prediction', requestData);
      
      setResult(response.data.prediction || response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Parameter information for tooltips
  const parameterInfo = {
    Pregnancies: "Normal Range: 0-15\nHigher values may indicate increased risk of gestational diabetes and insulin resistance.",
    Glucose: "Normal Range: 70-99 mg/dL (fasting)\n140+ mg/dL indicates diabetes\n100-139 mg/dL indicates prediabetes",
    BloodPressure: "Normal Range: <80 mmHg (diastolic)\nPrehypertension: 80-89 mmHg\nHigh Blood Pressure: ≥90 mmHg",
    SkinThickness: "Normal Range: 10-50 mm\nHigher values indicate increased body fat\nTypical range: 15-35 mm for adults",
    Insulin: "Normal Range: 2-25 μU/mL (fasting)\nPost-meal: 30-150 μU/mL\nInsulin resistance: >50 μU/mL (fasting)",
    BMI: "Normal Range: 18.5-24.9 kg/m²\nUnderweight: <18.5\nOverweight: 25-29.9\nObese: ≥30",
    DiabetesPedigreeFunction: "Normal Range: 0.08-2.42\nHigher values indicate stronger genetic predisposition\nAverage: 0.47",
    Age: "Normal Range: 21-81 years (in dataset)\nRisk increases significantly after age 45\nPeak risk: 65+ years"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-12 pt-8"
          variants={itemVariants}
        >
          <h1 className="main-heading mb-4 drop-shadow-lg">
            Diabetes Prediction
          </h1>
          <p className="text-xl text-[#F0F2F5]/90 max-w-2xl mx-auto body-text">
            Enter your medical parameters to predict the likelihood of diabetes using advanced machine learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="medical-parameters-card"
            variants={itemVariants}
          >
            <h2 className="subheading mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Medical Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <label className="label-text">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="relative group">
                        <button 
                          type="button"
                          className="text-[#1ABC9C] hover:text-[#2EEC71] focus:outline-none w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#1ABC9C]/20 transition-colors text-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#1B263B] border border-[#1ABC9C]/30 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                          <p className="text-[#F0F2F5] text-xs whitespace-pre-line">{parameterInfo[key]}</p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step={key === 'BMI' || key === 'DiabetesPedigreeFunction' ? '0.01' : '1'}
                      className="glass-input w-full"
                      placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                    />
                  </div>
                ))}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="predict-button bg-gradient-to-r from-[#16A085] to-[#1ABC9C] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Predict Diabetes'
                )}
              </motion.button>
            </form>

            {result && (
              <motion.div
                className={`mt-4 p-4 rounded-xl border-2 ${
                  result.includes('not') 
                    ? 'bg-green-500/20 border-green-500/30 text-[#F0F2F5]' 
                    : 'bg-red-500/20 border-red-500/30 text-[#F0F2F5]'
                } backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold">Prediction Result</h3>
                </div>
                <p className="mt-1 text-base">{result}</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-[#F0F2F5] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-sm">Error</span>
                </div>
                <p className="mt-1 text-sm">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* About This Tool section - on the right side on large screens, below on small screens */}
          <motion.div 
            className="about-tool-card lg:mt-0"
            variants={itemVariants}
          >
            <h2 className="subheading mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About This Tool
            </h2>
            <p className="body-text mb-4">
              This diabetes prediction tool uses a machine learning model trained on the Pima Indians Diabetes Database to predict the likelihood of diabetes based on medical parameters. The model provides an educational demonstration of how AI can be applied to healthcare.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#1ABC9C] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="body-text">Based on the Pima Indians Diabetes Database, a widely-used dataset in medical research</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#1ABC9C] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="body-text">Uses a Random Forest classifier model with 70%+ accuracy on test data</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#1ABC9C] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="body-text">Processes 8 key medical parameters to make predictions</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#1ABC9C] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="body-text">Provides instant results with detailed explanations</p>
              </div>
            </div>

            <div className="note-box flex items-start">
              <svg className="w-5 h-5 text-[#1ABC9C] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[#F0F2F5]/90 text-sm">
                <strong>Note:</strong> This tool is for educational purposes only and should not be used as a substitute for professional medical advice. Always consult with a healthcare provider for medical concerns.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Parameter Information section - always below the main content */}
        <motion.div 
          className="parameter-information-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="subheading mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Parameter Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Pregnancies",
                description: "Number of times the patient has been pregnant. This is important because pregnancy can affect insulin resistance and glucose tolerance.",
                icon: "♀"
              },
              {
                title: "Glucose",
                description: "Plasma glucose concentration measured in a 2-hour oral glucose tolerance test (mg/dl). Higher values indicate poorer glucose control.",
                icon: "💧"
              },
              {
                title: "Blood Pressure",
                description: "Diastolic blood pressure (mm Hg). High blood pressure is often associated with diabetes and cardiovascular complications.",
                icon: "❤️"
              },
              {
                title: "Skin Thickness",
                description: "Triceps skin fold thickness (mm), which is a measure of body fat. This can be an indicator of insulin resistance.",
                icon: "📏"
              },
              {
                title: "Insulin",
                description: "2-Hour serum insulin level (mu U/ml). This measures how much insulin the body is producing in response to glucose.",
                icon: "💉"
              },
              {
                title: "BMI",
                description: "Body Mass Index, calculated as weight in kilograms divided by the square of height in meters. Higher BMI is associated with increased diabetes risk.",
                icon: "⚖️"
              },
              {
                title: "Diabetes Pedigree Function",
                description: "A function that scores the likelihood of diabetes based on family history and genetic factors. Higher values indicate stronger genetic predisposition.",
                icon: "🧬"
              },
              {
                title: "Age",
                description: "Age in years. The risk of developing diabetes increases with age, particularly after 45 years.",
                icon: "👴"
              }
            ].map((param, index) => (
              <motion.div
                key={index}
                className="glass-card info-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg icon-background flex items-center justify-center text-[#1ABC9C] text-xl mr-4">
                    {param.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F0F2F5] text-lg mb-1">{param.title}</h3>
                    <p className="body-text">{param.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
      
      <div className="mt-8">
        <CreatorBadge />
      </div>
    </div>
  );
};

export default DiabetesPredictor;