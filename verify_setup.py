import requests
import time
import subprocess
import sys

def test_api_connection():
    """Test if the API is accessible"""
    try:
        # Test root endpoint
        response = requests.get('http://localhost:8001/', timeout=5)
        if response.status_code == 200:
            print("✅ API Root Endpoint: PASSED")
            return True
        else:
            print(f"❌ API Root Endpoint: FAILED (Status {response.status_code})")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ API Root Endpoint: FAILED (Connection Error - Is the API server running?)")
        return False
    except Exception as e:
        print(f"❌ API Root Endpoint: FAILED ({str(e)})")
        return False

def test_prediction():
    """Test the prediction endpoint"""
    try:
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
        if response.status_code == 200:
            print("✅ API Prediction Test: PASSED")
            print(f"   Prediction Result: {response.json()}")
            return True
        else:
            print(f"❌ API Prediction Test: FAILED (Status {response.status_code})")
            return False
    except Exception as e:
        print(f"❌ API Prediction Test: FAILED ({str(e)})")
        return False

def main():
    print("Diabetes Prediction Setup Verification")
    print("=" * 40)
    
    # Test API connection
    api_ok = test_api_connection()
    
    # Test prediction
    if api_ok:
        prediction_ok = test_prediction()
        
        if prediction_ok:
            print("\n🎉 All tests passed! Your setup is working correctly.")
            print("\nTo use the web application:")
            print("1. Make sure both servers are running")
            print("2. Open your browser and go to http://localhost:8080")
            print("3. Enter http://localhost:8001 in the API URL field")
            print("4. Fill in the medical data and click Predict")
        else:
            print("\n⚠️  API is accessible but prediction test failed.")
    else:
        print("\n❌ API connection failed. Please make sure the ML API server is running on port 8001.")
        print("\nTo start the servers:")
        print("1. Run: python -m uvicorn ml_api:app --reload --port 8001")
        print("2. Run: python -m uvicorn web_server:app --reload --port 8080")

if __name__ == "__main__":
    main()