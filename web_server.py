from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

app = FastAPI()

# Serve the index.html file
@app.get("/")
async def read_index():
    return FileResponse('index.html')

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Serve static files if needed
# app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    print("Starting Diabetes Prediction Web App...")
    print("Open your browser to http://localhost:8080")
    print("The app will connect to your public ngrok API automatically")
    uvicorn.run(app, host="0.0.0.0", port=8080)