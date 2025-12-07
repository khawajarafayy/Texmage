#!/bin/bash

# Script to run Selenium tests for Texmage
# This script sets up the environment and runs all test cases

echo "=========================================="
echo "Texmage Selenium Test Suite"
echo "=========================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is not installed"
    exit 1
fi

# Install dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Check if Chrome is installed
if ! command -v google-chrome &> /dev/null && ! command -v chromium-browser &> /dev/null; then
    echo "Warning: Chrome browser not found. Tests may fail."
fi

# Check if application is running
echo "Checking if application is running..."
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "Warning: Application may not be running on http://localhost:5173"
    echo "Please start the application before running tests"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run tests
echo "Running Selenium tests..."
python3 test_texmage.py

# Exit with test result
exit_code=$?
if [ $exit_code -eq 0 ]; then
    echo "=========================================="
    echo "All tests passed!"
    echo "=========================================="
else
    echo "=========================================="
    echo "Some tests failed. Check output above."
    echo "=========================================="
fi

exit $exit_code

