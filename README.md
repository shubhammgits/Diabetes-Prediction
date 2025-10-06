# Diabetes Prediction Web Application

This is a modern web application that combines a machine learning model with a React frontend for diabetes prediction. The application features a healthcare-focused design with professional UI components and a clean, medical-themed interface.

## Project Structure

```
Diabetes Prediction (Fast API)/
├── app.py                 # FastAPI application (serves ML API and React frontend)
├── retrained_model.sav    # Trained diabetes prediction model
├── requirements.txt       # Python dependencies
├── .gitignore             # Git ignore file (excludes unnecessary files)
├── README.md              # This file
├── build_frontend.py      # Script to build React frontend
├── test_app.py            # Test script for the application
├── frontend/              # React application
│   ├── package.json       # Node.js dependencies
│   ├── src/               # React components and source files
│   ├── public/            # Static assets
│   ├── build/             # Built React application (generated)
│   └── node_modules/      # Node.js modules (generated)
└── diabetes/              # Python virtual environment (excluded from git)
```

## How to run the application locally

1. **Activate the virtual environment**:
   ```bash
   .\diabetes\Scripts\activate
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js dependencies and build the React frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```
   
   Or use the build script:
   ```bash
   python build_frontend.py
   ```

4. **Start the application**:
   ```bash
   python app.py
   ```

5. **Access the web application**:
   Open your browser and go to `http://localhost:8000`

## Features of the Healthcare UI

- **Medical-Themed Design**: Clean, professional interface with healthcare-appropriate colors
- **Glassmorphism Header**: Elegant "Diabetes Prediction" header with gradient effect
- **Responsive Layout**: Works on mobile, tablet, and desktop devices
- **Professional Components**: Card-based design with subtle shadows and rounded corners
- **Parameter Information**: Detailed explanations for each medical parameter with healthcare icons
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Creator Badge**: "Made with ❤️ by Shubham" badge with profile image that zooms on hover

## Healthcare Design Elements

- **Color Palette**: Blue and purple gradients representing trust and professionalism
- **Typography**: Inter font for clean, readable text
- **Card Design**: Soft shadows and rounded corners for a modern medical interface
- **Input Fields**: Clean, accessible form elements with proper focus states
- **Result Display**: Color-coded results (green for non-diabetic, red for diabetic)

## How to use the prediction tool

1. Fill in all the medical parameters in the form:
   - Pregnancies: Number of pregnancies
   - Glucose: Glucose level (mg/dl)
   - Blood Pressure: Diastolic blood pressure (mm Hg)
   - Skin Thickness: Triceps skin fold thickness (mm)
   - Insulin: 2-Hour serum insulin (mu U/ml)
   - BMI: Body Mass Index
   - Diabetes Pedigree Function: Genetic influence score
   - Age: Age in years

2. Click "Predict Diabetes" to get the result.

## Deployment to Free Hosting Services

### Option 1: Render (Recommended)

1. Sign up at [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build command: `pip install -r requirements.txt && cd frontend && npm install && npm run build`
   - Start command: `python app.py`
   - Environment: Python 3
5. Deploy - Render will provide you with a permanent URL

### Option 2: Heroku

1. Sign up at [Heroku](https://heroku.com/)
2. Install Heroku CLI
3. Create a new app:
   ```bash
   heroku create your-app-name
   ```
4. Deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku master
   ```

## Development

To work on the React frontend:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The development server will run on `http://localhost:3000`

## Git Ignore Configuration

The `.gitignore` file excludes the following from version control:
- Python virtual environment (`diabetes/`)
- Node.js modules (`node_modules/`)
- Build outputs (`build/`)
- Cache files (`__pycache__/`, `.cache/`)
- Log files (`*.log`)
- Environment files (`.env`)
- IDE specific files (`.idea/`, `.vscode/`)
- OS generated files (`Thumbs.db`, `.DS_Store`)
- Model files (`*.sav`, `*.pkl`) - *Note: Currently included for demo purposes*
- Temporary files

## Troubleshooting

### "Model not loaded" error

Make sure the `retrained_model.sav` file is in the same directory as `app.py`

### Port conflicts

If port 8000 is already in use, modify the port in `app.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=YOUR_PORT_NUMBER)
```

### Node.js dependencies not found

Make sure you have Node.js and npm installed on your system.

## Sharing your deployed application

Once deployed to a hosting service:
1. Copy the provided URL
2. Share it on LinkedIn, WhatsApp, or any platform
3. Anyone with the link can use your diabetes prediction tool