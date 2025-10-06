import React from 'react';
import { motion } from 'framer-motion';

const ParameterInfo = () => {
  const parameters = [
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
  ];

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
    </div>
  );
};

export default ParameterInfo;