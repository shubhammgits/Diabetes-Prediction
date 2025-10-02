from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import json
import numpy as np


app = FastAPI()

class model_input(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


diabetes_model = pickle.load(open('diabetes_model.sav', 'rb'))


@app.post('/diabetes_prediction')
def diabetes_pred(input_parameters: model_input):

    # --- FIX 2: Get data directly from the Pydantic model ---
    # This is much cleaner and more efficient.
    input_list = [
        input_parameters.Pregnancies,
        input_parameters.Glucose,
        input_parameters.BloodPressure,
        input_parameters.SkinThickness,
        input_parameters.Insulin,
        input_parameters.BMI,
        input_parameters.DiabetesPedigreeFunction,
        input_parameters.Age
    ]

    # Convert to a numpy array for the model
    input_data_as_numpy_array = np.asarray(input_list)
    
    # Reshape the array as we are predicting for one instance
    input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

    # Make the prediction
    prediction = diabetes_model.predict(input_data_reshaped)

    if prediction[0] == 0:
        return 'The person is not diabetic'
    else:
        return 'The person is diabetic'
