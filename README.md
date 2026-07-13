# API Health Monitor

A full-stack API monitoring platform that continuously checks the health and availability of APIs and provides a real-time dashboard for monitoring service status and response times.

## Features

- Real-time API health monitoring
- Response time tracking
- Service uptime monitoring
- Dashboard with charts and statistics
- MongoDB-based service storage
- Email alerts for service downtime
- Swagger API documentation
- Dockerized frontend and backend
- Docker Compose support

## Tech Stack

### Frontend
- React
- Axios
- Chart.js
- CSS

### Backend
- FastAPI
- Uvicorn
- PyMongo
- Requests

### Database
- MongoDB Atlas

### DevOps
- Docker
- Docker Compose
- Docker Hub

- GitHub Actions CI/CD
- Kubernetes Deployment
- AWS EC2 Deployment
- Nginx Reverse Proxy

## Project Structure

```text
api-health-monitor
│
├── backend
│
├── frontend
│
├── docker-compose.yml
│
├── README.md
│
├── .github
│   └── workflows
│
└── k8s
```

## Run Locally

### Start containers

```bash
docker compose up -d
```

### Frontend

```
http://127.0.0.1:5173
```

### Swagger Documentation

```
http://127.0.0.1:8000/docs
```

## Docker Images

Frontend:

```bash
docker pull abeljoshy/apihealth-frontend:v1
```

Backend:

```bash
docker pull abeljoshy/apihealth-backend:v1
```

## Future Enhancements

- Automated CI pipeline using GitHub Actions
- Automated CD deployment to AWS EC2
- Kubernetes deployment with scaling support
- Prometheus monitoring
- Grafana dashboards

## Author

Abel Joshy