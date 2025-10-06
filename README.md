# Diabetes Prediction Web Application

This is a complete web application that combines both the frontend interface and the machine learning model API in a single deployment. No more ngrok URL updates needed!

## Files in this project

- `app.py`: Combined FastAPI application that serves both the web frontend and ML model API
- `index.html`: Frontend web interface
- `retrained_model.sav`: Trained diabetes prediction model
- `requirements.txt`: Python dependencies
- `README.md`: This file

## How to run the application locally

1. **Activate the virtual environment**:
   ```bash
   .\diabetes\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the application**:
   ```bash
   python app.py
   ```

4. **Access the web application**:
   Open your browser and go to `http://localhost:8000`

## How to deploy to a free hosting service

### Option 1: Render (Recommended Free Service)

1. **Sign up at [Render](https://render.com/)**
2. **Create a new Web Service**
3. **Connect your GitHub repository** (or upload your files)
4. **Configure the service**:
   - Build command: `pip install -r requirements.txt`
   - Start command: `python app.py`
   - Environment: Python 3
5. **Deploy** - Render will provide you with a permanent URL

### Option 2: Heroku

1. **Sign up at [Heroku](https://heroku.com/)**
2. **Install Heroku CLI**
3. **Create a new app**:
   ```bash
   heroku create your-app-name
   ```
4. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku master
   ```

### Option 3: Railway (Has free tier with limitations)

1. **Sign up at [Railway](https://railway.app/)**
2. **Create a new project**
3. **Deploy your files**
4. **Set the start command to `python app.py`**

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

## Benefits of this approach

- **No ngrok dependency**: The application is self-contained
- **No URL updates needed**: Everything runs on the same server
- **Easy deployment**: Single file deployment to any platform
- **Permanent URL**: When deployed to a hosting service, you get a permanent URL
- **Shareable**: You can share the URL with anyone

## Troubleshooting

### "Model not loaded" error

Make sure the [retrained_model.sav](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/retrained_model.sav) file is in the same directory as [app.py](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/app.py)

### Port conflicts

If port 8000 is already in use, modify the port in [app.py](file:///c:/Users/shubh/OneDrive/Desktop/Diabetes%20Prediction%20(Fast%20API)/app.py):
```python
uvicorn.run(app, host="0.0.0.0", port=YOUR_PORT_NUMBER)
```

## Sharing your deployed application

Once deployed to a hosting service:
1. Copy the provided URL
2. Share it on LinkedIn, WhatsApp, or any platform
3. Anyone with the link can use your diabetes prediction tool