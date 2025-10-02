from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import json

app = FastAPI()

class model_input(BaseModel):
    Pregnancies : int
    Glucose : int
    BloodPressure : int
    SkinThickness : int
    Insulin : int
    BMI : float
    DiabetesPedigreeFunction : float
    Age : int