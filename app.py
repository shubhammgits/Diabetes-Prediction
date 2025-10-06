from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
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

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'retrained_model.sav')
FRONTEND_BUILD_DIR = os.path.join(BASE_DIR, 'frontend', 'build')
STATIC_DIR = os.path.join(FRONTEND_BUILD_DIR, 'static')
INDEX_HTML = os.path.join(FRONTEND_BUILD_DIR, 'index.html')

print(f"BASE_DIR: {BASE_DIR}")
print(f"MODEL_PATH: {MODEL_PATH}")
print(f"FRONTEND_BUILD_DIR: {FRONTEND_BUILD_DIR}")
print(f"STATIC_DIR: {STATIC_DIR}")
print(f"INDEX_HTML: {INDEX_HTML}")

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

print(f"Frontend build directory exists: {os.path.exists(FRONTEND_BUILD_DIR)}")
print(f"Static directory exists: {os.path.exists(STATIC_DIR)}")
print(f"Index.html exists: {os.path.exists(INDEX_HTML)}")

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
    print("Static files mounted successfully")
else:
    print("Static files directory not found")

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/debug")
def debug_info():
    import json
    
    debug_info = {
        "current_working_directory": os.getcwd(),
        "base_dir": BASE_DIR,
        "model_path": MODEL_PATH,
        "model_exists": os.path.exists(MODEL_PATH),
        "frontend_build_dir": FRONTEND_BUILD_DIR,
        "frontend_build_exists": os.path.exists(FRONTEND_BUILD_DIR),
        "static_dir": STATIC_DIR,
        "static_dir_exists": os.path.exists(STATIC_DIR),
        "index_html": INDEX_HTML,
        "index_html_exists": os.path.exists(INDEX_HTML),
        "files_in_cwd": [],
        "files_in_base_dir": [],
        "files_in_frontend": [],
        "files_in_build": []
    }
    
    try:
        debug_info["files_in_cwd"] = os.listdir(os.getcwd())
    except:
        pass
        
    try:
        debug_info["files_in_base_dir"] = os.listdir(BASE_DIR)
    except:
        pass
        
    try:
        frontend_path = os.path.join(BASE_DIR, 'frontend')
        if os.path.exists(frontend_path):
            debug_info["files_in_frontend"] = os.listdir(frontend_path)
    except:
        pass
        
    try:
        if os.path.exists(FRONTEND_BUILD_DIR):
            debug_info["files_in_build"] = os.listdir(FRONTEND_BUILD_DIR)
    except:
        pass
    
    return JSONResponse(content=debug_info)

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

@app.get("/photo.jpeg")
async def get_photo():
    photo_path = os.path.join(BASE_DIR, 'photo.jpeg')
    if os.path.exists(photo_path):
        return FileResponse(photo_path)
    return {"error": "Photo not found"}

@app.get("/")
async def read_index():
    possible_paths = [
        INDEX_HTML,
        os.path.join(BASE_DIR, 'frontend', 'build', 'index.html'),
        os.path.join(BASE_DIR, 'build', 'index.html'),
        'frontend/build/index.html',
        'build/index.html',
        'index.html'
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            print(f"Found index.html at: {path}")
            return FileResponse(path)
    
    print("index.html not found in any of the expected locations")
    return {"error": "Frontend build not found. Please ensure the React app is built."}

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    possible_paths = [
        INDEX_HTML,
        os.path.join(BASE_DIR, 'frontend', 'build', 'index.html'),
        os.path.join(BASE_DIR, 'build', 'index.html'),
        'frontend/build/index.html',
        'build/index.html',
        'index.html'
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            print(f"Found index.html at: {path}")
            return FileResponse(path)
    
    print("index.html not found in any of the expected locations")
    return {"error": "Frontend build not found. Please ensure the React app is built."}

if __name__ == "__main__":
    print("Starting Diabetes Prediction App...")
    print("Access the web application at: http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)