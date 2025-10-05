import json
import requests

url = 'http://127.0.0.1:8001/diabetes_prediction'

input_data_for_model = {
    "Pregnancies": 1,
    "Glucose": 103,
    "BloodPressure": 30,
    "SkinThickness": 38,
    "Insulin": 83,
    "BMI": 43.3,
    "DiabetesPedigreeFunction": 0.183,
    "Age": 33
}

headers = {'Content-Type': 'application/json'}
response = requests.post(url, json=input_data_for_model, headers=headers)

print("Status Code:", response.status_code)
print("Response:", response.text)