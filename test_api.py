import requests
import json

# Test data
test_data = {
    "Pregnancies": 1,
    "Glucose": 103,
    "BloodPressure": 30,
    "SkinThickness": 38,
    "Insulin": 83,
    "BMI": 43.3,
    "DiabetesPedigreeFunction": 0.183,
    "Age": 33
}

# Test local API
try:
    response = requests.post('http://localhost:8001/diabetes_prediction', json=test_data)
    print("Local API Response Status:", response.status_code)
    print("Local API Response Data:", response.json())
except Exception as e:
    print("Local API Error:", str(e))

# If you have an ngrok URL, test that as well
# Uncomment and replace with your actual ngrok URL
# try:
#     response = requests.post('https://YOUR_NGROK_URL.ngrok-free.app/diabetes_prediction', json=test_data)
#     print("Ngrok API Response Status:", response.status_code)
#     print("Ngrok API Response Data:", response.json())
# except Exception as e:
#     print("Ngrok API Error:", str(e))