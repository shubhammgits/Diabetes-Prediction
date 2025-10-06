import React from 'react';
import { motion } from 'framer-motion';

const ParameterInfo = () => {
  const parameters = [
    {
      title: "Pregnancies",
      description: "Number of times the patient has been pregnant. This is important because pregnancy can affect insulin resistance and glucose tolerance.",
      icon: "♀",
      color: "bg-[#05668D]"
    },
    {
      title: "Glucose",
      description: "Plasma glucose concentration measured in a 2-hour oral glucose tolerance test (mg/dl). Higher values indicate poorer glucose control.",
      icon: "💧",
      color: "bg-[#028090]"
    },
    {
      title: "Blood Pressure",
      description: "Diastolic blood pressure (mm Hg). High blood pressure is often associated with diabetes and cardiovascular complications.",
      icon: "❤️",
      color: "bg-[#00A896]"
    },
    {
      title: "Skin Thickness",
      description: "Triceps skin fold thickness (mm), which is a measure of body fat. This can be an indicator of insulin resistance.",
      icon: "📏",
      color: "bg-[#02C39A]"
    },
    {
      title: "Insulin",
      description: "2-Hour serum insulin level (mu U/ml). This measures how much insulin the body is producing in response to glucose.",
      icon: "💉",
      color: "bg-[#F0F3BD]"
    },
    {
      title: "BMI",
      description: "Body Mass Index, calculated as weight in kilograms divided by the square of height in meters. Higher BMI is associated with increased diabetes risk.",
      icon: "⚖️",
      color: "bg-[#028090]"
    },
    {
      title: "Diabetes Pedigree Function",
      description: "A function that scores the likelihood of diabetes based on family history and genetic factors. Higher values indicate stronger genetic predisposition.",
      icon: "🧬",
      color: "bg-[#00A896]"
    },
    {
      title: "Age",
      description: "Age in years. The risk of developing diabetes increases with age, particularly after 45 years.",
      icon: "👴",
      color: "bg-[#05668D]"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-stone-200/25 to-stone-300/25 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-stone-400/25">
      <h2 className="text-2xl font-bold text-[#05668D] mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Parameter Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parameters.map((param, index) => (
          <motion.div
            key={index}
            className="bg-amber-50/50 rounded-xl p-4 border border-amber-200 hover:bg-amber-100/50 transition-all duration-300 cursor-help"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${param.color} flex items-center justify-center text-[#05668D] text-xl mr-4 border border-stone-400/30`}>
                {param.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#05668D] text-lg mb-1">{param.title}</h3>
                <p className="text-[#05668D]/80 text-sm">{param.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParameterInfo;