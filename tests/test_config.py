"""
Configuration file for Selenium tests
Update these values according to your environment
"""

# Base URL of the web application
BASE_URL = "http://localhost:5173"

# Timeout settings (in seconds)
IMPLICIT_WAIT = 10
EXPLICIT_WAIT = 10
PAGE_LOAD_TIMEOUT = 30

# Chrome options for headless mode
CHROME_OPTIONS = [
    '--headless',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-blink-features=AutomationControlled'
]

# Test data
TEST_USER_EMAIL = "testuser@example.com"
TEST_USER_PASSWORD = "TestPassword123!"
TEST_USER_NAME = "Test User"

