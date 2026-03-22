@echo off
echo ==========================================
echo   Staff Dashboard - Launching Project
echo ==========================================
echo.
echo Starting Vite development server...
npm run dev
echo.
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start project. Did you run 'setup.bat' first?
)
pause
