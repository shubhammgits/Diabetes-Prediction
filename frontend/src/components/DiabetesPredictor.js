import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ParameterInfo from './ParameterInfo';
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
    <div className="min-h-screen pb-20">
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
                    <label className="label-text mb-2 block">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
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
                className="predict-button"
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
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Predict Diabetes
                  </>
                )}
              </motion.button>
            </form>

            {result && (
              <motion.div
                className={`mt-6 p-6 rounded-xl border-2 ${
                  result.includes('not') 
                    ? 'bg-green-500/20 border-green-500/30 text-[#F0F2F5]' 
                    : 'bg-red-500/20 border-red-500/30 text-[#F0F2F5]'
                } backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold">Prediction Result</h3>
                </div>
                <p className="mt-2 text-lg">{result}</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-[#F0F2F5] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Error</span>
                </div>
                <p className="mt-1">{error}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <ParameterInfo />
            
            <motion.div 
              className="about-tool-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="subheading mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Tool
              </h2>
              <p className="body-text mb-4">
                This tool uses a machine learning model trained on medical data to predict the likelihood of diabetes. 
                The prediction is based on the Pima Indians Diabetes Database, which is commonly used for diabetes research.
              </p>
              <div className="note-box">
                <p className="text-[#F0F2F5]/90 text-sm flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#1ABC9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>Note:</strong> This tool is for educational purposes only and should not be used as a substitute for professional medical advice.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <CreatorBadge />
    </div>
  );
};

export default DiabetesPredictor;