import requests
import time

# Wait a moment for the server to fully start
time.sleep(2)

try:
    # Test health endpoint
    response = requests.get('http://localhost:8001/health', timeout=5)
    print(f"Health check - Status: {response.status_code}")
    print(f"Health check - Data: {response.json()}")
    
    # Test prediction endpoint
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
    
    response = requests.post('http://localhost:8001/diabetes_prediction', json=test_data, timeout=5)
    print(f"Prediction - Status: {response.status_code}")
    print(f"Prediction - Data: {response.json()}")
    
except Exception as e:
    print(f"Error: {e}")