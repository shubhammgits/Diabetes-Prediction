from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pickle
import uvicorn
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class model_input(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

try:
    diabetes_model = pickle.load(open('retrained_model.sav', 'rb'))
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    diabetes_model = None

@app.get("/")
async def read_index():
    return FileResponse('index.html')

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post('/diabetes_prediction')
def diabetes_pred(input_parameters: model_input):
    if diabetes_model is None:
        return {"error": "Model not loaded"}

    input_dictionary = input_parameters.dict()
    
    preg = input_dictionary['Pregnancies']
    glu = input_dictionary['Glucose']
    bp = input_dictionary['BloodPressure']
    skin = input_dictionary['SkinThickness']
    insulin = input_dictionary['Insulin']
    bmi = input_dictionary['BMI']
    dpf = input_dictionary['DiabetesPedigreeFunction']
    age = input_dictionary['Age']

    input_list = [[preg, glu, bp, skin, insulin, bmi, dpf, age]]
    
    prediction = diabetes_model.predict(input_list)
    
    if prediction[0] == 0:
        return {"prediction": "The Person is not Diabetic"}
    else:
        return {"prediction": "The Person is Diabetic"}

if __name__ == "__main__":
    print("Starting Diabetes Prediction App...")
    print("Access the web application at: http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)