from fastapi import APIRouter
from app.schemas.service_schema import ServiceCreate
from app.services.health_checker import check_api
from app.core.database import services_collection

router = APIRouter()


# --------------------------------------------------
# Health Endpoint
# --------------------------------------------------
@router.get("/health")
def health():
    return {
        "status": "UP",
        "service": "API Health Monitor",
        "message": "Server is running"
    }


# --------------------------------------------------
# Add a new API to monitor
# --------------------------------------------------
@router.post("/add")
def add_service(service: ServiceCreate):

    services_collection.insert_one(service.dict())

    return {
        "message": "Service added successfully",
        "service": service
    }


# --------------------------------------------------
# Get all monitored APIs with health status
# --------------------------------------------------
@router.get("/all")
def get_all_services():

    services = list(
        services_collection.find({}, {"_id": 0})
    )

    results = []

    for service in services:

        health = check_api(service["url"])

        results.append({
            "name": service["name"],
            "url": service["url"],
            "status": health.get("status"),
            "response_time": health.get("response_time_ms"),
            "status_code": health.get("status_code")
        })

    return results


# --------------------------------------------------
# Check a single API without saving
# --------------------------------------------------
@router.post("/check")
def check_service(service: ServiceCreate):

    result = check_api(service.url)

    return {
        "service_name": service.name,
        "url": service.url,
        "result": result
    }


# --------------------------------------------------
# Dashboard Statistics
# --------------------------------------------------
@router.get("/stats")
def get_stats():

    results = get_all_services()

    total = len(results)

    healthy = len([
        x for x in results
        if x["status"] == "UP"
    ])

    warning = len([
        x for x in results
        if x["status"] == "WARNING"
    ])

    down = len([
        x for x in results
        if x["status"] == "DOWN"
    ])

    response_times = [
        x["response_time"]
        for x in results
        if x["response_time"] is not None
    ]

    average_response = (
        round(sum(response_times) / len(response_times), 2)
        if response_times else 0
    )

    return {
        "total_apis": total,
        "healthy": healthy,
        "warning": warning,
        "down": down,
        "average_response_time": average_response
    }


# --------------------------------------------------
# Delete API
# --------------------------------------------------
@router.delete("/delete/{service_name}")
def delete_service(service_name: str):

    result = services_collection.delete_one(
        {"name": service_name}
    )

    if result.deleted_count == 0:
        return {
            "message": "Service not found"
        }

    return {
        "message": "Service deleted successfully"
    }