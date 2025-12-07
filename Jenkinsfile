pipeline {
    agent any
    
    environment {
        // Application URLs
        APP_URL = 'http://client:5173'
        BACKEND_URL = 'http://server:3000'
        TEST_URL = 'http://client:5173'
        
        // Docker image names
        APP_IMAGE = 'texmage-app'
        TEST_IMAGE = 'texmage-tests'
        
        // Docker Compose project name
        COMPOSE_PROJECT = 'texmage'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
                sh 'git log -1 --pretty=format:"%h - %an, %ar : %s"'
            }
        }
        
        stage('Build Application Docker Image') {
            steps {
                echo 'Building application Docker image...'
                script {
                    // Build the application image
                    sh '''
                        docker build -t ${APP_IMAGE}:latest -f Dockerfile .
                    '''
                }
            }
        }
        
        stage('Start Application with Docker Compose') {
            steps {
                echo 'Starting application services with Docker Compose...'
                script {
                    // Start MongoDB, Server, and Client using Docker Compose
                    sh '''
                        docker-compose -f docker-compose.test.yml down -v || true
                        docker-compose -f docker-compose.test.yml up -d mongodb
                        sleep 5
                        docker-compose -f docker-compose.test.yml up -d server
                        sleep 5
                        docker-compose -f docker-compose.test.yml up -d client
                        sleep 15
                    '''
                    
                    // Wait for services to be ready
                    sh '''
                        echo "Waiting for services to be ready..."
                        for i in {1..30}; do
                            if curl -f http://localhost:3000 >/dev/null 2>&1 || curl -f http://localhost:5173 >/dev/null 2>&1; then
                                echo "Services are ready!"
                                break
                            fi
                            echo "Waiting for services... ($i/30)"
                            sleep 2
                        done
                    '''
                    
                    // Verify services are running
                    sh '''
                        echo "Checking service status..."
                        docker-compose -f docker-compose.test.yml ps
                        docker ps | grep texmage || true
                    '''
                }
            }
        }
        
        stage('Build Test Docker Image') {
            steps {
                echo 'Building test Docker image...'
                script {
                    sh '''
                        docker build -t ${TEST_IMAGE}:latest -f tests/Dockerfile .
                    '''
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium tests in Docker container...'
                script {
                    // Run tests in a container that can access the application
                    sh '''
                        docker run --rm \
                            --network texmage-test-network \
                            -e BASE_URL=http://client:5173 \
                            -e APP_URL=http://client:5173 \
                            ${TEST_IMAGE}:latest \
                            python test_texmage.py
                    '''
                }
            }
            post {
                always {
                    // Archive test results
                    archiveArtifacts artifacts: 'tests/*.log', allowEmptyArchive: true
                    // Show test logs
                    sh '''
                        docker-compose -f docker-compose.test.yml logs tests || true
                    '''
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                echo 'Cleaning up Docker containers and images...'
                script {
                    sh '''
                        docker-compose -f docker-compose.test.yml down -v || true
                        docker rmi ${APP_IMAGE}:latest || true
                        docker rmi ${TEST_IMAGE}:latest || true
                        docker system prune -f || true
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed'
            // Clean up any remaining containers
            sh '''
                docker-compose -f docker-compose.test.yml down -v || true
            '''
        }
        success {
            echo '✅ All tests passed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs for details.'
            // Optionally send notifications
        }
        unstable {
            echo '⚠️ Pipeline is unstable. Some tests may have failed.'
        }
    }
}

