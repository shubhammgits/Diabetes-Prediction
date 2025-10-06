#!/usr/bin/env python3
"""
Deployment script for the Diabetes Prediction Web App
This script starts the web server that serves the frontend application.
The frontend automatically connects to your public ngrok API.
"""

import uvicorn
import sys
import os

def main():
    print("=" * 50)
    print("Diabetes Prediction Web App Deployment")
    print("=" * 50)
    print("Frontend URL: http://localhost:8080")
    print("Backend API: https://70624a1d7c44.ngrok-free.app")
    print("=" * 50)
    print("Make sure your ngrok API is running!")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Start the web server
        uvicorn.run(
            "web_server:app",
            host="0.0.0.0",
            port=8080,
            reload=False
        )
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()