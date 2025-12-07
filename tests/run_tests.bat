@echo off
REM Script to run Selenium tests for Texmage on Windows
REM This script sets up the environment and runs all test cases

echo ==========================================
echo Texmage Selenium Test Suite
echo ==========================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo Error: pip is not installed
    exit /b 1
)

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Check if application is running
echo Checking if application is running...
curl -s http://localhost:5173 >nul 2>&1
if errorlevel 1 (
    echo Warning: Application may not be running on http://localhost:5173
    echo Please start the application before running tests
    pause
)

REM Run tests
echo Running Selenium tests...
python test_texmage.py

REM Exit with test result
if errorlevel 1 (
    echo ==========================================
    echo Some tests failed. Check output above.
    echo ==========================================
    exit /b 1
) else (
    echo ==========================================
    echo All tests passed!
    echo ==========================================
    exit /b 0
)

