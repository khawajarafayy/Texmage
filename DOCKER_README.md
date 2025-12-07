# Docker Setup for Texmage Application

This directory contains Docker configuration files for containerizing the Texmage application.

## Files Overview

- **Dockerfile** - Multi-stage build for the application (client + server)
- **docker-compose.yml** - Production setup with MongoDB, Server, and Client
- **docker-compose.test.yml** - Testing setup used by Jenkins pipeline
- **.dockerignore** - Files to exclude from Docker builds

## Quick Start

### Development Mode

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Mode

```bash
# Build and start
docker-compose up -d --build

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## Services

### MongoDB
- Port: `27017`
- Database: `texmage`
- Data persisted in volume: `mongodb_data`

### Backend Server
- Port: `3000`
- Environment: `production`
- Depends on: MongoDB

### Frontend Client
- Port: `5173`
- Development mode with hot reload
- Connects to backend at `http://server:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://mongodb:27017

# Backend
PORT=3000
NODE_ENV=production

# Frontend
VITE_BACKEND_URL=http://localhost:3000
```

## Building Images

### Build application image:
```bash
docker build -t texmage-app:latest .
```

### Build test image:
```bash
docker build -t texmage-tests:latest -f tests/Dockerfile .
```

## Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs -f [service-name]

# Rebuild and start
docker-compose up -d --build

# Check service status
docker-compose ps
```

## For Jenkins Pipeline

The Jenkins pipeline uses `docker-compose.test.yml` which:
- Sets up isolated test network
- Runs services in test mode
- Includes test container configuration

See `JENKINS_SETUP.md` for Jenkins configuration details.

## Troubleshooting

### Port already in use
```bash
# Change ports in docker-compose.yml
# Or stop conflicting services
```

### MongoDB connection issues
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check logs
docker-compose logs mongodb
```

### Build failures
```bash
# Clean build
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## Network

All services communicate via Docker network: `texmage-network`

Services can reach each other using service names:
- `mongodb` - MongoDB service
- `server` - Backend server
- `client` - Frontend client

