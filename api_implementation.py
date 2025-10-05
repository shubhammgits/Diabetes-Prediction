import requests

url = 'https://70624a1d7c44.ngrok-free.app/diabetes_prediction'

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

response = requests.post(url, json=input_data_for_model)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())