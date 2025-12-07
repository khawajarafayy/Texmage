# Quick Start: Jenkins Pipeline Setup

## 🚀 Quick Setup (5 Steps)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Add Jenkins pipeline and Docker configuration"
git push origin main
```

### Step 2: On AWS EC2 - Install Docker
```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
sudo usermod -aG docker jenkins

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Restart Jenkins
sudo systemctl restart jenkins
```

### Step 3: Configure Jenkins
1. Go to `http://16.171.140.103:8080/`
2. Install plugins: **Docker Pipeline**, **Docker**, **Git**
3. Go to **Manage Jenkins → Configure System → Docker**
   - Add Docker installation
   - Docker Host URI: `unix:///var/run/docker.sock`

### Step 4: Create Pipeline Job
1. **New Item** → Name: `Texmage-Test-Pipeline` → **Pipeline**
2. **Pipeline** section:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/yourusername/texmage.git`
   - Script Path: `Jenkinsfile`
3. Click **Save**

### Step 5: Run Pipeline
1. Click **Build Now**
2. Watch the build progress
3. ✅ All 12 tests should pass!

## 📋 What the Pipeline Does

1. ✅ Checks out code from GitHub
2. ✅ Builds application Docker image
3. ✅ Starts MongoDB, Server, Client with Docker Compose
4. ✅ Builds test Docker image (Python + Selenium + Chrome)
5. ✅ Runs 12 Selenium tests in container
6. ✅ Cleans up containers

## 🔧 Troubleshooting

**Docker permission denied?**
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

**Services not starting?**
```bash
docker-compose -f docker-compose.test.yml logs
```

**Tests failing?**
- Check if services are running: `docker ps`
- Check network: `docker network ls`
- View test logs in Jenkins console output

## 📁 Files Created

- `Dockerfile` - Application container
- `docker-compose.yml` - Production setup
- `docker-compose.test.yml` - Testing setup
- `tests/Dockerfile` - Test environment (Python + Chrome)
- `Jenkinsfile` - Pipeline definition
- `.dockerignore` - Docker ignore file

## 🎯 Expected Result

```
✓ Checkout completed
✓ Application built
✓ Services started
✓ Tests running...
✓ All 12 tests passed!
✓ Cleanup completed
```

---

For detailed instructions, see `JENKINS_SETUP.md`

