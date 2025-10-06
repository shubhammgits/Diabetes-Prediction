@echo off
echo Diabetes Prediction Web App
echo ==========================
echo.
echo Starting the web application server...
echo.
echo Make sure your ngrok API is running!
echo.
echo Web App will be available at: http://localhost:8080
echo.
pause
echo.
echo Starting server...
python web_server.py
pause