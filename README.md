# Diabetes Prediction Web Application

This is a web application that uses your public ngrok-deployed machine learning model to predict diabetes based on medical parameters.

## Files in this project

- `ml_api.py`: FastAPI server that serves the ML model (for your ngrok deployment)
- `api_implementation.py`: Helper functions for API communication
- `index.html`: Frontend web interface (configured to use your public ngrok API)
- `web_server.py`: Server to serve the web frontend
- `update_ngrok_url.py`: Script to update the ngrok URL when it changes
- `deploy_webapp.py`: Simple deployment script for the web app
- `retrained_model.sav`: Trained diabetes prediction model
- `requirements.txt`: Python dependencies
- `README.md`: This file

## How to deploy the web application for public use

### Step 1: Start your ngrok API server
1. Run your Jupyter notebook or the ngrok deployment script to start your API server
2. Note the ngrok URL that is generated (it will look like `https://abcd1234.ngrok-free.app`)

### Step 2: Update the URLs in the application
If your ngrok URL has changed from the one in the code:
```bash
python update_ngrok_url.py
```
Enter your new ngrok URL when prompted.

### Step 3: Start the web server
```bash
# Activate virtual environment
.\diabetes\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the web server
python web_server.py
```

### Step 4: Access the web application
Open your browser and go to `http://localhost:8080`

### Step 5: Deploy publicly (optional)
To make the web app accessible to others:

1. **Using ngrok for the web app**:
   ```bash
   # In a new terminal, after starting web_server.py
   ngrok http 8080
   ```
   This will give you a public URL for the web app.

2. **Using a cloud platform** (like Heroku, Render, etc.):
   - Deploy the web_server.py application
   - The app will automatically connect to your ngrok API

## How to use the prediction tool

1. Fill in all the medical parameters in the form:
   - Pregnancies: Number of pregnancies
   - Glucose: Glucose level
   - Blood Pressure: Blood pressure level
   - Skin Thickness: Skin fold thickness
   - Insulin: Insulin level
   - BMI: Body Mass Index
   - Diabetes Pedigree Function: Diabetes pedigree function
   - Age: Age in years

2. Click "Predict" to get the result.

## No local API required

This web application is designed to work with your public ngrok API endpoint. Users don't need to run any local servers - they just need to access the web app URL.

The web app automatically connects to your ngrok API.

## Customization

If you need to change the API URL:
1. Run `python update_ngrok_url.py` and enter your new URL
2. Or manually edit [index.html](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/index.html) and [api_implementation.py](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/api_implementation.py) to update the URL

## Troubleshooting

### "Failed to fetch" error

This error occurs when the web app cannot connect to your ngrok API:

1. Make sure your ngrok API is running and accessible
2. Check that the ngrok URL is correct and hasn't expired
3. Update the URL using `python update_ngrok_url.py` if needed
4. Verify the API is working by testing it directly with [api_implementation.py](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/api_implementation.py)

### Ngrok URL Expired

Ngrok URLs expire after a certain period. When this happens:

1. Restart your ngrok API server to get a new URL
2. Run `python update_ngrok_url.py` to update the URLs in the application
3. Restart the web server

### CORS Issues

The API should already have CORS enabled. If you're still having issues:

1. Make sure you're using the updated [ml_api.py](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/ml_api.py) file with CORS middleware
2. Restart your ngrok API server after making changes