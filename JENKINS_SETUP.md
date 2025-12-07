# Jenkins Pipeline Setup Guide for Texmage

This guide explains how to set up and run the Jenkins pipeline for automated Selenium testing of the Texmage application on AWS EC2.

## Prerequisites

### On AWS EC2 Instance

1. **Docker and Docker Compose installed**
   ```bash
   # Install Docker
   sudo yum update -y
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker ec2-user
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   
   # Logout and login again for group changes to take effect
   ```

2. **Jenkins installed and running**
   - Access Jenkins at: `http://16.171.140.103:8080/`
   - Ensure Jenkins has Docker permissions

3. **GitHub repository**
   - Your code should be in a GitHub repository
   - Jenkins needs access to the repository

## Step 1: Configure Jenkins

### 1.1 Install Required Jenkins Plugins

1. Go to Jenkins Dashboard → Manage Jenkins → Manage Plugins
2. Install the following plugins:
   - **Docker Pipeline** (for Docker support)
   - **Docker** (for Docker integration)
   - **Git** (for GitHub integration)
   - **Pipeline** (for Jenkinsfile support)
   - **Blue Ocean** (optional, for better UI)

### 1.2 Configure Docker in Jenkins

1. Go to Manage Jenkins → Configure System
2. Scroll to "Docker" section
3. Add Docker installation:
   - Name: `docker`
   - Docker Host URI: `unix:///var/run/docker.sock`
   - Test Connection to verify

### 1.3 Configure GitHub Access (if using private repo)

1. Go to Manage Jenkins → Manage Credentials
2. Add GitHub credentials:
   - Kind: Username with password or SSH Username with private key
   - Add your GitHub username and token/password

## Step 2: Create Jenkins Pipeline

### Option A: Using Jenkinsfile from GitHub (Recommended)

1. **Create a New Pipeline Job:**
   - Go to Jenkins Dashboard
   - Click "New Item"
   - Enter name: `Texmage-Test-Pipeline`
   - Select "Pipeline"
   - Click OK

2. **Configure Pipeline:**
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your GitHub repository URL
     - Example: `https://github.com/yourusername/texmage.git`
   - **Credentials**: Select your GitHub credentials (if private repo)
   - **Branches to build**: `*/main` or `*/master`
   - **Script Path**: `Jenkinsfile` (should be in root directory)
   - Click Save

### Option B: Using Pipeline Script Directly

1. Create a new Pipeline job
2. In Pipeline definition, select "Pipeline script"
3. Copy the contents of `Jenkinsfile` into the script box
4. Update the repository URL in the Checkout stage if needed

## Step 3: Configure Environment Variables

If your application needs specific environment variables:

1. Go to your Pipeline job → Configure
2. Scroll to "Environment variables"
3. Add variables:
   - `MONGODB_URI`: `mongodb://mongodb:27017`
   - `VITE_BACKEND_URL`: `http://server:3000`
   - `BASE_URL`: `http://client:5173`

Or modify the `Jenkinsfile` environment section.

## Step 4: Run the Pipeline

1. Go to your Pipeline job
2. Click "Build Now"
3. Monitor the build progress:
   - Click on the build number
   - Click "Console Output" to see real-time logs

## Step 5: Verify Pipeline Execution

The pipeline will:

1. ✅ **Checkout** code from GitHub
2. ✅ **Build** application Docker image
3. ✅ **Start** services (MongoDB, Server, Client) using Docker Compose
4. ✅ **Build** test Docker image (Python + Selenium + Chrome)
5. ✅ **Run** Selenium tests in containerized environment
6. ✅ **Cleanup** Docker containers and images

## Pipeline Stages Explained

### Stage 1: Checkout
- Fetches code from GitHub repository

### Stage 2: Build Application Docker Image
- Builds the Docker image for the application
- Uses multi-stage build for optimization

### Stage 3: Start Application with Docker Compose
- Starts MongoDB database
- Starts backend server
- Starts frontend client
- Waits for services to be ready

### Stage 4: Build Test Docker Image
- Builds Docker image with:
  - Python 3.11
  - Chrome browser
  - ChromeDriver
  - Selenium
  - Test dependencies

### Stage 5: Run Selenium Tests
- Runs tests in Docker container
- Connects to application via Docker network
- Executes all 12 test cases
- Reports results

### Stage 6: Cleanup
- Stops and removes containers
- Removes Docker images
- Cleans up system

## Troubleshooting

### Issue: Docker permission denied
```bash
# Solution: Add Jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue: Cannot connect to Docker daemon
```bash
# Solution: Ensure Docker is running
sudo systemctl status docker
sudo systemctl start docker
```

### Issue: Services not starting
```bash
# Check Docker Compose logs
docker-compose logs
docker-compose ps
```

### Issue: Tests failing to connect to application
- Verify services are running: `docker-compose ps`
- Check network connectivity: `docker network ls`
- Verify URLs in test configuration

### Issue: ChromeDriver errors
- The test Docker image includes Chrome and ChromeDriver
- If issues persist, check the test Dockerfile

## Manual Testing (Optional)

You can manually test the setup:

```bash
# 1. Build application image
docker build -t texmage-app:latest .

# 2. Start services
docker-compose up -d

# 3. Build test image
docker build -t texmage-tests:latest -f tests/Dockerfile .

# 4. Run tests
docker run --rm \
  --network texmage_texmage-network \
  -e BASE_URL=http://client:5173 \
  texmage-tests:latest

# 5. Cleanup
docker-compose down -v
```

## GitHub Webhook (Optional)

To automatically trigger builds on code push:

1. Go to your GitHub repository → Settings → Webhooks
2. Add webhook:
   - Payload URL: `http://16.171.140.103:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Just the push event
3. In Jenkins job → Configure → Build Triggers
4. Check "GitHub hook trigger for GITScm polling"

## Monitoring

- **Build History**: View all pipeline runs
- **Console Output**: See detailed execution logs
- **Test Results**: View test execution results
- **Blue Ocean**: Better visualization (if installed)

## Expected Output

When pipeline runs successfully, you should see:

```
✓ Checkout completed
✓ Application Docker image built
✓ Services started (MongoDB, Server, Client)
✓ Test Docker image built
✓ All 12 tests passed
✓ Cleanup completed
```

## Support

For issues or questions:
1. Check Jenkins console output for errors
2. Review Docker logs: `docker-compose logs`
3. Verify all prerequisites are installed
4. Check network connectivity between containers

---

**Note**: Make sure your GitHub repository contains:
- `Jenkinsfile` (in root)
- `Dockerfile` (in root)
- `docker-compose.yml` (in root)
- `tests/Dockerfile` (for test environment)
- All application code

