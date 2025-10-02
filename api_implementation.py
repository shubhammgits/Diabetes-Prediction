import requests

url = 'http://127.0.0.1:8000/diabetes_prediction'

input_data_for_model = {
    "Pregnancies": 1,
    "Glucose": 85,
    "BloodPressure": 66,
    "SkinThickness": 29,
    "Insulin": 0,
    "BMI": 26.6,
    "DiabetesPedigreeFunction": 0.351,
    "Age": 31
}

response = requests.post(url, json=input_data_for_model)

# Check the status code to make sure the request was successful
print(f"Status Code: {response.status_code}")

# Print the response from the API
print(f"Response Body: {response.text}")
