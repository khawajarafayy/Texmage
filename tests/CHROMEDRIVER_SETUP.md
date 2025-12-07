# ChromeDriver Setup Guide

## Problem: "OSError: [WinError 193] %1 is not a valid Win32 application"

This error typically occurs when ChromeDriver is incompatible or corrupted. Follow these steps to fix it:

## Solution 1: Manual ChromeDriver Installation (Recommended for Windows)

1. **Check your Chrome version:**
   - Open Chrome
   - Go to `chrome://version/`
   - Note the version number (e.g., 131.0.6778.85)

2. **Download matching ChromeDriver:**
   - Visit: https://chromedriver.chromium.org/downloads
   - Or use: https://googlechromelabs.github.io/chrome-for-testing/
   - Download the version matching your Chrome browser
   - **Important**: Download the Windows version (chromedriver-win64.zip)

3. **Extract and place ChromeDriver:**
   ```powershell
   # Option A: Place in tests directory
   # Extract chromedriver.exe to: D:\Work\Web Dev\Texmage\tests\chromedriver.exe
   
   # Option B: Add to system PATH
   # Extract to a folder like C:\chromedriver\
   # Add C:\chromedriver\ to your system PATH
   ```

4. **Verify installation:**
   ```powershell
   cd tests
   .\chromedriver.exe --version
   ```

## Solution 2: Use webdriver-manager (Automatic)

The test suite will try to automatically download ChromeDriver, but if it fails:

```powershell
pip install --upgrade webdriver-manager selenium
```

Then clear the cache:
```powershell
# On Windows, clear webdriver-manager cache
Remove-Item -Recurse -Force "$env:USERPROFILE\.wdm\drivers\chromedriver" -ErrorAction SilentlyContinue
```

## Solution 3: Use Chrome for Testing (Latest)

1. Visit: https://googlechromelabs.github.io/chrome-for-testing/
2. Download the latest stable ChromeDriver for Windows
3. Extract `chromedriver.exe` to the `tests` folder

## Solution 4: Disable webdriver-manager (Use system ChromeDriver)

If you have ChromeDriver in your PATH, the test will automatically use it.

## Quick Fix Script

Create a file `setup_chromedriver.ps1`:

```powershell
# Download ChromeDriver automatically
$chromeVersion = (Get-Item (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe' -ErrorAction SilentlyContinue).'(Default)').VersionInfo.FileVersion
Write-Host "Chrome version: $chromeVersion"

# Download matching ChromeDriver
# Visit https://googlechromelabs.github.io/chrome-for-testing/ and download manually
# Or use webdriver-manager which does this automatically
```

## Verification

After setup, run:
```powershell
cd tests
python test_texmage.py
```

If you still get errors, check:
- Chrome browser is installed and up to date
- ChromeDriver version matches Chrome version
- ChromeDriver is 64-bit (if you have 64-bit Windows)
- No antivirus is blocking ChromeDriver

## Alternative: Use Edge WebDriver

If ChromeDriver continues to cause issues, you can modify the test to use Edge:

```python
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.edge.service import Service as EdgeService

edge_options = EdgeOptions()
edge_options.add_argument('--headless')
# ... rest of configuration
```

