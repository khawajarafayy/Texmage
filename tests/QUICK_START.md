# Quick Start Guide - Selenium Tests

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd tests
pip install -r requirements.txt
```

### Step 2: Start Your Application
Make sure your Texmage application is running:
- Frontend: `http://localhost:5173`
- Backend: Running and connected to MongoDB

### Step 3: Run Tests
```bash
python test_texmage.py
```

That's it! 🎉

## 📋 What Gets Tested

The test suite automatically tests:
- ✅ Homepage loading
- ✅ Navigation (pricing, result pages)
- ✅ Login/Signup functionality
- ✅ Form validation
- ✅ Protected routes
- ✅ UI elements presence
- ✅ Modal interactions

## 🔧 Troubleshooting

**Problem**: ChromeDriver not found
**Solution**: The tests use webdriver-manager which auto-downloads ChromeDriver

**Problem**: Connection refused
**Solution**: Make sure your app is running on `http://localhost:5173`

**Problem**: Tests fail on signup/login
**Solution**: Ensure MongoDB is running and backend server is started

## 📊 View Results

After running, you'll see:
```
Tests run: 12
Successes: 12
Failures: 0
Errors: 0
```

## 🎯 For Assignment Submission

Your test suite includes:
- ✅ 12 automated test cases (exceeds 10 requirement)
- ✅ Headless Chrome configuration
- ✅ Jenkins pipeline ready
- ✅ AWS EC2 compatible
- ✅ Database integration tests

All requirements met! 🎓

