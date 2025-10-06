import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParameterInfo = () => {
  const [activeInfo, setActiveInfo] = useState(null);

  const parameters = [
    {
      title: "Pregnancies",
      description: "Number of times the patient has been pregnant. This is important because pregnancy can affect insulin resistance and glucose tolerance.",
      icon: "♀",
      info: "Normal Range: 0-15\nHigher values may indicate increased risk of gestational diabetes and insulin resistance.\nTypical values: 0-2 for non-pregnant women, up to 10+ for women with multiple pregnancies."
    },
    {
      title: "Glucose",
      description: "Plasma glucose concentration measured in a 2-hour oral glucose tolerance test (mg/dl). Higher values indicate poorer glucose control.",
      icon: "💧",
      info: "Normal Range: 70-99 mg/dL (fasting)\n140+ mg/dL indicates diabetes\n100-139 mg/dL indicates prediabetes\nPost-meal normal: <140 mg/dL"
    },
    {
      title: "Blood Pressure",
      description: "Diastolic blood pressure (mm Hg). High blood pressure is often associated with diabetes and cardiovascular complications.",
      icon: "❤️",
      info: "Normal Range: <80 mmHg (diastolic)\nPrehypertension: 80-89 mmHg\nHigh Blood Pressure: ≥90 mmHg\nOptimal: 60-80 mmHg"
    },
    {
      title: "Skin Thickness",
      description: "Triceps skin fold thickness (mm), which is a measure of body fat. This can be an indicator of insulin resistance.",
      icon: "📏",
      info: "Normal Range: 10-50 mm\nHigher values indicate increased body fat\nTypical range: 15-35 mm for adults\nUsed to calculate body fat percentage"
    },
    {
      title: "Insulin",
      description: "2-Hour serum insulin level (mu U/ml). This measures how much insulin the body is producing in response to glucose.",
      icon: "💉",
      info: "Normal Range: 2-25 μU/mL (fasting)\nPost-meal: 30-150 μU/mL\nInsulin resistance: >50 μU/mL (fasting)\nOptimal range: 5-20 μU/mL"
    },
    {
      title: "BMI",
      description: "Body Mass Index, calculated as weight in kilograms divided by the square of height in meters. Higher BMI is associated with increased diabetes risk.",
      icon: "⚖️",
      info: "Normal Range: 18.5-24.9 kg/m²\nUnderweight: <18.5\nOverweight: 25-29.9\nObese: ≥30\nMorbidly Obese: ≥40\nOptimal range for diabetes prevention: 18.5-22.9"
    },
    {
      title: "Diabetes Pedigree Function",
      description: "A function that scores the likelihood of diabetes based on family history and genetic factors. Higher values indicate stronger genetic predisposition.",
      icon: "🧬",
      info: "Normal Range: 0.08-2.42\nHigher values indicate stronger genetic predisposition\nAverage: 0.47\nValues >1.0 indicate significantly increased risk\nUsed to quantify genetic influence on diabetes"
    },
    {
      title: "Age",
      description: "Age in years. The risk of developing diabetes increases with age, particularly after 45 years.",
      icon: "👴",
      info: "Normal Range: 21-81 years (in dataset)\nRisk increases significantly after age 45\nPeak risk: 65+ years\nEarly onset diabetes: <30 years\nPrediabetes risk begins around age 35"
    }
  ];

  const toggleInfo = (index) => {
    setActiveInfo(activeInfo === index ? null : index);
  };

  return (
    <div className="parameter-information-card">
      <h2 className="subheading mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Parameter Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parameters.map((param, index) => (
          <motion.div
            key={index}
            className="glass-card info-card relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg icon-background flex items-center justify-center text-[#1ABC9C] text-xl mr-4">
                {param.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#F0F2F5] text-lg mb-1">{param.title}</h3>
                  <button 
                    onClick={() => toggleInfo(index)}
                    className="text-[#1ABC9C] hover:text-[#2EEC71] focus:outline-none w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#1ABC9C]/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <p className="body-text">{param.description}</p>
              </div>
            </div>
            
            <AnimatePresence>
              {activeInfo === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pt-3 border-t border-[#1ABC9C]/30"
                >
                  <p className="text-[#F0F2F5] text-sm whitespace-pre-line">{param.info}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParameterInfo;