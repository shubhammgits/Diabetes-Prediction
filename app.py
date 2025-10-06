from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pickle
import uvicorn
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class model_input(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'retrained_model.sav')
FRONTEND_BUILD_DIR = os.path.join(BASE_DIR, 'frontend', 'build')
STATIC_DIR = os.path.join(FRONTEND_BUILD_DIR, 'static')
INDEX_HTML = os.path.join(FRONTEND_BUILD_DIR, 'index.html')

try:
    if os.path.exists(MODEL_PATH):
        diabetes_model = pickle.load(open(MODEL_PATH, 'rb'))
        print("Model loaded successfully")
    else:
        print(f"Model file not found at {MODEL_PATH}")
        diabetes_model = None
except Exception as e:
    print(f"Error loading model: {e}")
    diabetes_model = None

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post('/diabetes_prediction')
def diabetes_pred(input_parameters: model_input):
    if diabetes_model is None:
        return {"error": "Model not loaded"}
    
    input_dictionary = input_parameters.dict()
    
    preg = input_dictionary['Pregnancies']
    glu = input_dictionary['Glucose']
    bp = input_dictionary['BloodPressure']
    skin = input_dictionary['SkinThickness']
    insulin = input_dictionary['Insulin']
    bmi = input_dictionary['BMI']
    dpf = input_dictionary['DiabetesPedigreeFunction']
    age = input_dictionary['Age']

    input_list = [[preg, glu, bp, skin, insulin, bmi, dpf, age]]
    
    prediction = diabetes_model.predict(input_list)
    
    if prediction[0] == 0:
        return {"prediction": "The Person is not Diabetic"}
    else:
        return {"prediction": "The Person is Diabetic"}

# Serve static files if they exist
if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/photo.jpeg")
async def get_photo():
    photo_path = os.path.join(BASE_DIR, 'photo.jpeg')
    if os.path.exists(photo_path):
        return FileResponse(photo_path)
    return {"error": "Photo not found"}

@app.get("/")
async def read_index():
    if os.path.exists(INDEX_HTML):
        return FileResponse(INDEX_HTML)
    return {"error": "Frontend build not found. Please run 'npm run build' in the frontend directory."}

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # For any other route, serve the index.html file (for React Router)
    if os.path.exists(INDEX_HTML):
        return FileResponse(INDEX_HTML)
    return {"error": "Frontend build not found. Please run 'npm run build' in the frontend directory."}

if __name__ == "__main__":
    print("Starting Diabetes Prediction App...")
    print("Access the web application at: http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)