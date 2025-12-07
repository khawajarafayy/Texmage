"""
ChromeDriver Setup Diagnostic Script
Run this script to check if ChromeDriver is properly configured
"""

import sys
import os

def check_chrome():
    """Check if Chrome is installed"""
    print("=" * 60)
    print("Checking Chrome Browser...")
    print("=" * 60)
    
    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
    ]
    
    chrome_found = False
    for path in chrome_paths:
        if os.path.exists(path):
            print(f"✓ Chrome found at: {path}")
            chrome_found = True
            break
    
    if not chrome_found:
        print("✗ Chrome not found in common locations")
        print("  Please ensure Chrome is installed")
        return False
    
    return True

def check_chromedriver_path():
    """Check if ChromeDriver is in PATH"""
    print("\n" + "=" * 60)
    print("Checking ChromeDriver in PATH...")
    print("=" * 60)
    
    import shutil
    chromedriver_path = shutil.which("chromedriver")
    if chromedriver_path:
        print(f"✓ ChromeDriver found in PATH: {chromedriver_path}")
        return chromedriver_path
    else:
        print("✗ ChromeDriver not found in PATH")
        return None

def check_chromedriver_local():
    """Check if ChromeDriver is in tests directory"""
    print("\n" + "=" * 60)
    print("Checking ChromeDriver in tests directory...")
    print("=" * 60)
    
    local_paths = [
        os.path.join(os.path.dirname(__file__), "chromedriver.exe"),
        os.path.join(os.path.dirname(__file__), "chromedriver"),
    ]
    
    for path in local_paths:
        if os.path.exists(path):
            print(f"✓ ChromeDriver found locally: {path}")
            return path
    
    print("✗ ChromeDriver not found in tests directory")
    return None

def check_selenium():
    """Check if Selenium is installed"""
    print("\n" + "=" * 60)
    print("Checking Selenium installation...")
    print("=" * 60)
    
    try:
        import selenium
        print(f"✓ Selenium installed: version {selenium.__version__}")
        return True
    except ImportError:
        print("✗ Selenium not installed")
        print("  Run: pip install selenium")
        return False

def check_webdriver_manager():
    """Check if webdriver-manager is installed"""
    print("\n" + "=" * 60)
    print("Checking webdriver-manager...")
    print("=" * 60)
    
    try:
        from webdriver_manager.chrome import ChromeDriverManager
        print("✓ webdriver-manager installed")
        
        # Try to get ChromeDriver path
        try:
            driver_path = ChromeDriverManager().install()
            print(f"✓ ChromeDriver path from webdriver-manager: {driver_path}")
            if os.path.exists(driver_path):
                print(f"  File exists: ✓")
                file_size = os.path.getsize(driver_path)
                print(f"  File size: {file_size} bytes")
                return True
            else:
                print(f"  File exists: ✗")
                return False
        except Exception as e:
            print(f"✗ Error getting ChromeDriver: {str(e)}")
            return False
    except ImportError:
        print("✗ webdriver-manager not installed")
        print("  Run: pip install webdriver-manager")
        return False

def test_chromedriver():
    """Test if ChromeDriver actually works"""
    print("\n" + "=" * 60)
    print("Testing ChromeDriver...")
    print("=" * 60)
    
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.chrome.service import Service
        
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        
        # Try to initialize WebDriver
        try:
            driver = webdriver.Chrome(options=chrome_options)
            print("✓ ChromeDriver works! (using system PATH)")
            driver.quit()
            return True
        except Exception as e1:
            print(f"✗ System ChromeDriver failed: {str(e1)}")
            
            # Try with webdriver-manager
            try:
                from webdriver_manager.chrome import ChromeDriverManager
                service = Service(ChromeDriverManager().install())
                driver = webdriver.Chrome(service=service, options=chrome_options)
                print("✓ ChromeDriver works! (using webdriver-manager)")
                driver.quit()
                return True
            except Exception as e2:
                print(f"✗ webdriver-manager ChromeDriver failed: {str(e2)}")
                return False
    except Exception as e:
        print(f"✗ Selenium test failed: {str(e)}")
        return False

def main():
    """Run all checks"""
    print("\n" + "=" * 60)
    print("ChromeDriver Setup Diagnostic")
    print("=" * 60 + "\n")
    
    results = {
        "Chrome": check_chrome(),
        "Selenium": check_selenium(),
        "webdriver-manager": check_webdriver_manager(),
        "ChromeDriver PATH": check_chromedriver_path() is not None,
        "ChromeDriver Local": check_chromedriver_local() is not None,
    }
    
    # Test ChromeDriver
    if all([results["Chrome"], results["Selenium"]]):
        results["ChromeDriver Test"] = test_chromedriver()
    else:
        results["ChromeDriver Test"] = False
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    for check, result in results.items():
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"{check:30} {status}")
    
    print("\n" + "=" * 60)
    if all(results.values()):
        print("✓ All checks passed! You can run the test suite.")
        return 0
    else:
        print("✗ Some checks failed. Please fix the issues above.")
        print("\nFor help, see: CHROMEDRIVER_SETUP.md")
        return 1

if __name__ == "__main__":
    sys.exit(main())

