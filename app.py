from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
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

# Try to find the base directory in different ways
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'retrained_model.sav')

# Try multiple possible locations for frontend build
# Try multiple possible locations for frontend build. Instead of only
# checking a few fixed paths, walk the tree and pick the first directory
# that contains an index.html (and preferably a static/ folder). This
# is more robust for render where the build location may vary or be
# nested.
FRONTEND_BUILD_DIR = None
STATIC_DIR = None
INDEX_HTML = None

def find_frontend_build(root_dir: str):
    """Search recursively under root_dir for a directory that looks
    like a React build (contains index.html). Prefer directories that
    also have a static/ folder next to index.html.
    Returns (build_dir, index_html_path, static_dir) or (None, None, None).
    """
    candidates = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if 'index.html' in filenames:
            idx = os.path.join(dirpath, 'index.html')
            stat = os.path.join(dirpath, 'static')
            candidates.append((dirpath, idx, stat))

    # Prefer a candidate that also contains static/ (the typical React build)
    for c in candidates:
        if os.path.exists(c[2]):
            return c

    # Otherwise return the first found index.html if any
    if candidates:
        return candidates[0]

    return (None, None, None)

# Search common root locations: repo root and frontend folder
# First prefer common build locations explicitly (this prevents accidentally
# picking up frontend/public/index.html which is a source template, not a
# production build). Only accept frontend/public if it contains a static
# folder (i.e. looks like a built site).
preferred_checks = [
    os.path.join(BASE_DIR, 'build'),
    os.path.join(BASE_DIR, 'frontend', 'build'),
]

for p in preferred_checks:
    idx = os.path.join(p, 'index.html')
    if os.path.exists(idx):
        FRONTEND_BUILD_DIR = p
        INDEX_HTML = idx
        STATIC_DIR = os.path.join(p, 'static') if os.path.exists(os.path.join(p, 'static')) else None
        break

# If we didn't find the usual build directories, search inside frontend
# but avoid using frontend/public/index.html unless it has static assets.
if not FRONTEND_BUILD_DIR:
    # check frontend/public but only if it contains static/
    frontend_public = os.path.join(BASE_DIR, 'frontend', 'public')
    if os.path.exists(os.path.join(frontend_public, 'index.html')) and os.path.exists(os.path.join(frontend_public, 'static')):
        FRONTEND_BUILD_DIR = frontend_public
        INDEX_HTML = os.path.join(frontend_public, 'index.html')
        STATIC_DIR = os.path.join(frontend_public, 'static')

# As a final fallback, do a recursive search for any index.html (prefers folders
# that have static/ because find_frontend_build checks for that first).
if not FRONTEND_BUILD_DIR:
    for root in (BASE_DIR, os.path.join(BASE_DIR, 'frontend')):
        bdir, idx, stat = find_frontend_build(root)
        if bdir:
            FRONTEND_BUILD_DIR = bdir
            INDEX_HTML = idx
            STATIC_DIR = stat if os.path.exists(stat) else None
            break

print(f"BASE_DIR: {BASE_DIR}")
print(f"MODEL_PATH: {MODEL_PATH}")
print(f"FRONTEND_BUILD_DIR: {FRONTEND_BUILD_DIR}")
print(f"STATIC_DIR: {STATIC_DIR}")
print(f"INDEX_HTML: {INDEX_HTML}")

# Check if directories exist
print(f"Base directory exists: {os.path.exists(BASE_DIR)}")
print(f"Frontend directory exists: {os.path.exists(os.path.join(BASE_DIR, 'frontend'))}")

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

print(f"Frontend build directory exists: {os.path.exists(FRONTEND_BUILD_DIR) if FRONTEND_BUILD_DIR else False}")
print(f"Static directory exists: {os.path.exists(STATIC_DIR) if STATIC_DIR else False}")
print(f"Index.html exists: {os.path.exists(INDEX_HTML) if INDEX_HTML else False}")

# If STATIC_DIR wasn't found next to the detected index.html, try a
# broader search for common static directories under the project so
# deployments that place assets in different locations still work.
def find_any_static(root_dir: str):
    # prefer build/static or public/static, then any folder named 'static'
    candidates = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        base = os.path.basename(dirpath).lower()
        if base == 'static' or base == 'assets':
            candidates.append(dirpath)
        # also prefer typical build/static patterns
        if dirpath.replace('\\', '/').endswith('/build/static') or dirpath.replace('\\', '/').endswith('/public/static'):
            candidates.insert(0, dirpath)

    return candidates[0] if candidates else None

if STATIC_DIR and os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
    print(f"Static files mounted successfully from: {STATIC_DIR}")
else:
    fallback_static = find_any_static(BASE_DIR)
    if fallback_static and os.path.exists(fallback_static):
        STATIC_DIR = fallback_static
        app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
        print(f"Static files mounted from fallback location: {STATIC_DIR}")
    else:
        print("Static files directory not found")

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/debug")
def debug_info():
    possible_build_paths = [
        os.path.join(BASE_DIR, 'build'),
        os.path.join(BASE_DIR, 'frontend', 'build'),
        os.path.join(BASE_DIR, 'frontend-build'),
        os.path.join(BASE_DIR, 'frontend', 'public'),
        'build',
        'frontend/build',
        'frontend-build',
        'index.html'
    ]

    debug_info = {
        "current_working_directory": os.getcwd(),
        "base_dir": BASE_DIR,
        "model_path": MODEL_PATH,
        "model_exists": os.path.exists(MODEL_PATH),
        "frontend_build_dir": FRONTEND_BUILD_DIR,
        "frontend_build_exists": os.path.exists(FRONTEND_BUILD_DIR) if FRONTEND_BUILD_DIR else False,
        "static_dir": STATIC_DIR,
        "static_dir_exists": os.path.exists(STATIC_DIR) if STATIC_DIR else False,
        "index_html": INDEX_HTML,
        "index_html_exists": os.path.exists(INDEX_HTML) if INDEX_HTML else False,
        "files_in_cwd": [],
        "files_in_base_dir": [],
        "possible_build_paths": possible_build_paths,
        "path_checks": {path: os.path.exists(path) for path in possible_build_paths}
    }
    
    try:
        debug_info["files_in_cwd"] = os.listdir(os.getcwd())
    except:
        pass
        
    try:
        debug_info["files_in_base_dir"] = os.listdir(BASE_DIR)
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
    # Try to find index.html in multiple locations
    possible_paths = [
        INDEX_HTML,
        os.path.join(BASE_DIR, 'build', 'index.html'),
        os.path.join(BASE_DIR, 'frontend', 'build', 'index.html'),
        os.path.join(BASE_DIR, 'frontend-build', 'index.html'),
        'build/index.html',
        'frontend/build/index.html',
        'frontend-build/index.html',
        'index.html'
    ]
    
    for path in possible_paths:
        if path and os.path.exists(path):
            print(f"Found index.html at: {path}")
            return FileResponse(path)
    
    print("index.html not found in any of the expected locations")
    return HTMLResponse("""
    <html>
        <head><title>Diabetes Prediction App</title></head>
        <body>
            <h1>Diabetes Prediction App</h1>
            <p>Application is running, but frontend build not found.</p>
            <p>API endpoints are available at:</p>
            <ul>
                <li>POST /diabetes_prediction - For diabetes predictions</li>
                <li>GET /health - Health check</li>
                <li>GET /debug - Debug information</li>
            </ul>
        </body>
    </html>
    """)

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # Try to find index.html in multiple locations
    possible_paths = [
        INDEX_HTML,
        os.path.join(BASE_DIR, 'build', 'index.html'),
        os.path.join(BASE_DIR, 'frontend', 'build', 'index.html'),
        os.path.join(BASE_DIR, 'frontend-build', 'index.html'),
        'build/index.html',
        'frontend/build/index.html',
        'frontend-build/index.html',
        'index.html'
    ]
    
    for path in possible_paths:
        if path and os.path.exists(path):
            print(f"Found index.html at: {path}")
            return FileResponse(path)
    
    print("index.html not found in any of the expected locations")
    return HTMLResponse("""
    <html>
        <head><title>Diabetes Prediction App</title></head>
        <body>
            <h1>Diabetes Prediction App</h1>
            <p>Application is running, but frontend build not found.</p>
            <p>API endpoints are available at:</p>
            <ul>
                <li>POST /diabetes_prediction - For diabetes predictions</li>
                <li>GET /health - Health check</li>
                <li>GET /debug - Debug information</li>
            </ul>
        </body>
    </html>
    """)

if __name__ == "__main__":
    print("Starting Diabetes Prediction App...")
    print("Access the web application at: http://localhost:8000")
    # Use the PORT environment variable provided by Render (or other
    # platforms). Fall back to 8000 for local development.
    port = int(os.environ.get('PORT', 8000))
    print(f"Listening on 0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)