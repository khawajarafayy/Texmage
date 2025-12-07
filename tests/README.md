# Selenium Test Suite for Texmage

This directory contains automated Selenium test cases for the Texmage web application.

## Overview

The test suite includes **12 comprehensive automated test cases** that cover:
- Homepage functionality
- User authentication (Login/Signup)
- Navigation between pages
- Form validation
- Protected routes
- UI element presence
- Modal interactions

## Prerequisites

1. **Python 3.7 or higher** installed
2. **Chrome browser** installed
3. **ChromeDriver** - Can be installed automatically via webdriver-manager or manually
4. **Application running** - The web application should be running on `http://localhost:5173` (default Vite dev server port)

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install ChromeDriver (if not using webdriver-manager):
   - Download from: https://chromedriver.chromium.org/
   - Add to system PATH
   - Or use webdriver-manager (recommended)

## Configuration

Before running tests, ensure:
1. The web application is running (both client and server)
2. Update `base_url` in `test_texmage.py` if your application runs on a different port
3. MongoDB should be connected and running (for signup/login tests)

## Running Tests

### Run all tests:
```bash
python test_texmage.py
```

### Run specific test:
```bash
python -m unittest test_texmage.TexmageTestSuite.test_01_homepage_loads
```

### Run with verbose output:
```bash
python test_texmage.py -v
```

## Test Cases

1. **test_01_homepage_loads** - Verifies homepage loads with all main elements
2. **test_02_navigate_to_pricing** - Tests navigation to pricing page
3. **test_03_login_modal_opens** - Verifies login modal opens correctly
4. **test_04_signup_form_validation** - Tests form validation with empty fields
5. **test_05_login_invalid_credentials** - Tests login with invalid credentials
6. **test_06_successful_signup** - Tests successful user registration
7. **test_07_navigate_to_result_page** - Tests protected route access
8. **test_08_homepage_elements_presence** - Verifies all homepage elements
9. **test_09_pricing_page_elements** - Tests pricing page displays correctly
10. **test_10_logo_navigation** - Tests logo click navigation
11. **test_11_login_modal_close** - Tests modal close functionality
12. **test_12_generate_button_click** - Tests Generate button behavior

## Headless Mode

All tests run in **headless Chrome mode** by default, which is required for:
- CI/CD pipelines (Jenkins)
- AWS EC2 instances
- Automated testing environments

The headless configuration is set in the `setUpClass` method.

## Notes

- Tests use explicit waits (WebDriverWait) for better reliability
- Random email/name generation for signup tests to avoid conflicts
- Some tests may require the backend server to be running
- Test execution time: Approximately 2-3 minutes for full suite

## Troubleshooting

### ChromeDriver Issues

If you encounter `OSError: [WinError 193]` or ChromeDriver errors:

1. **Run diagnostic script first:**
   ```bash
   python check_chromedriver.py
   ```

2. **Common solutions:**
   - **ChromeDriver version mismatch**: Ensure ChromeDriver version matches your Chrome browser version
   - **Download ChromeDriver manually**: See `CHROMEDRIVER_SETUP.md` for detailed instructions
   - **Clear webdriver-manager cache**: Delete `%USERPROFILE%\.wdm\drivers\chromedriver` folder
   - **Reinstall webdriver-manager**: `pip install --upgrade webdriver-manager`

### Other Issues

1. **Connection refused**: Make sure the application is running on the specified port
2. **Element not found**: Increase wait times or check if the application UI has changed
3. **Timeout errors**: Check network connectivity and server response times
4. **Import errors**: Ensure all dependencies are installed: `pip install -r requirements.txt`

## Integration with Jenkins

For Jenkins pipeline integration:

```groovy
stage('Selenium Tests') {
    steps {
        sh '''
            cd tests
            pip install -r requirements.txt
            python test_texmage.py
        '''
    }
}
```

## Author

Generated for Texmage Web Application Testing Assignment

