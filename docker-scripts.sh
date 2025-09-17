#!/bin/bash

# Docker Management Scripts for MakeReels

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build and start services
start_services() {
    print_status "Building and starting MakeReels services..."
    check_docker
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from template..."
        cp docker.env .env
        print_warning "Please edit .env file with your API keys before continuing."
        read -p "Press Enter to continue after editing .env file..."
    fi
    
    docker-compose up --build -d
    print_success "Services started successfully!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:8000"
    print_status "Health Check: http://localhost:8000/health"
}

# Function to start development services
start_dev() {
    print_status "Starting MakeReels in development mode..."
    check_docker
    
    docker-compose -f docker-compose.dev.yml up --build
}

# Function to stop services
stop_services() {
    print_status "Stopping MakeReels services..."
    docker-compose down
    print_success "Services stopped successfully!"
}

# Function to view logs
view_logs() {
    if [ -z "$1" ]; then
        print_status "Viewing logs for all services..."
        docker-compose logs -f
    else
        print_status "Viewing logs for $1 service..."
        docker-compose logs -f "$1"
    fi
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to check service health
health_check() {
    print_status "Checking service health..."
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        print_success "Containers are running"
        
        # Check backend health
        if curl -f http://localhost:8000/health > /dev/null 2>&1; then
            print_success "Backend is healthy"
        else
            print_error "Backend health check failed"
        fi
        
        # Check frontend
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            print_success "Frontend is accessible"
        else
            print_error "Frontend is not accessible"
        fi
    else
        print_error "No containers are running"
    fi
}

# Function to show help
show_help() {
    echo "MakeReels Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start       Build and start all services"
    echo "  dev         Start services in development mode"
    echo "  stop        Stop all services"
    echo "  restart     Restart all services"
    echo "  logs        View logs (optionally specify service: frontend|backend)"
    echo "  health      Check service health"
    echo "  cleanup     Stop services and clean up Docker resources"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 dev"
    echo "  $0 logs backend"
    echo "  $0 health"
}

# Main script logic
case "$1" in
    start)
        start_services
        ;;
    dev)
        start_dev
        ;;
    stop)
        stop_services
        ;;
    restart)
        stop_services
        start_services
        ;;
    logs)
        view_logs "$2"
        ;;
    health)
        health_check
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac


