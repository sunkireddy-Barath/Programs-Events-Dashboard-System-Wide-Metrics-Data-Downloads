@echo off
echo ==========================================
echo   Staff Dashboard - Project Setup
echo ==========================================
echo.
echo Installing dependencies via npm...
npm install
echo.
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed. Please check your internet connection and try manually.
) else (
    echo [SUCCESS] All dependencies installed successfully.
    echo.
    echo You can now run 'start.bat' to launch the project.
)
pause
