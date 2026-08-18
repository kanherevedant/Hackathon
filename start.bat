@echo off

echo Starting Customer Retention Project...
echo.

start cmd /k "cd /d C:\Users\vedan\OneDrive\Hackathon\backend && npm start"

start cmd /k "cd /d C:\Users\vedan\OneDrive\Hackathon\ml && python -m uvicorn main:app --reload"

start cmd /k "cd /d C:\Users\vedan\OneDrive\Hackathon\frontend && npm run dev"

echo.
echo Backend, ML service and Frontend are starting...
echo.

pause