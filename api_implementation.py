import requests
import json

# Use the ngrok URL from your notebook
url = 'https://ac4b2077afa5.ngrok-free.app/diabetes_prediction'

def predict_diabetes(input_data):
    """
    Function to send data to the diabetes prediction API
    """
    try:
        response = requests.post(url, json=input_data)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
    except requests.exceptions.RequestException as e:
        return {"error": f"API request failed: {str(e)}"}

# Example usage
if __name__ == "__main__":
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

    result = predict_diabetes(input_data_for_model)
    print("Result:", result)