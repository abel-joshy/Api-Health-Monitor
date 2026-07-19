from fastapi import APIRouter, HTTPException
from app.schemas.service_schema import ServiceCreate
from app.services.health_checker import check_api
from app.core.database import services_collection
from app.core.seed import seed_services

router = APIRouter()

# =====================================================
# API Health
# =====================================================
@router.get("/health")
def health():
    return {
        "status": "UP",
        "service": "API Health Monitor",
        "message": "Server is running"
    }


@router.get("/health/auth")
def auth_health():
    return {
        "service": "Authentication Service",
        "status": "UP"
    }


@router.get("/health/users")
def users_health():
    return {
        "service": "User Service",
        "status": "UP"
    }


@router.get("/health/admin")
def admin_health():
    return {
        "service": "Admin Service",
        "status": "UP"
    }


@router.get("/health/contact")
def contact_health():
    return {
        "service": "Contact Service",
        "status": "UP"
    }


@router.get("/health/messages")
def messages_health():
    return {
        "service": "Message Service",
        "status": "UP"
    }


@router.get("/health/notifications")
def notifications_health():
    return {
        "service": "Notification Service",
        "status": "UP"
    }


@router.get("/health/prices")
def prices_health():
    return {
        "service": "Price Service",
        "status": "UP"
    }


@router.get("/health/pickups")
def pickups_health():
    return {
        "service": "Pickup Service",
        "status": "UP"
    }


@router.get("/health/admin-pickups")
def admin_pickups_health():
    return {
        "service": "Admin Pickup Service",
        "status": "UP"
    }


# =====================================================
# Seed Services
# =====================================================
@router.post("/seed")
def seed():

    seed_services()

    return {
        "success": True,
        "message": "Services loaded successfully."
    }


# =====================================================
# Add API
# =====================================================
@router.post("/add")
def add_service(service: ServiceCreate):

    existing = services_collection.find_one(
        {"url": service.url}
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Service already exists."
        )

    services_collection.insert_one(service.dict())

    return {
        "success": True,
        "message": "Service added successfully.",
        "service": service
    }


# =====================================================
# Get All APIs
# =====================================================
@router.get("/all")
def get_all_services():

    services = list(
        services_collection.find({}, {"_id": 0})
    )

    results = []

    for service in services:

        try:

            health = check_api(service["url"])

            results.append({

                "name": service["name"],
                "url": service["url"],
                "method": service.get("method", "GET"),
                "category": service.get("category", "General"),

                "status": health.get("status"),
                "status_code": health.get("status_code"),
                "response_time": health.get("response_time_ms")

            })

        except Exception as e:

            results.append({

                "name": service["name"],
                "url": service["url"],
                "method": service.get("method", "GET"),
                "category": service.get("category", "General"),

                "status": "DOWN",
                "status_code": 500,
                "response_time": 0,
                "error": str(e)

            })

    return results


# =====================================================
# Check Single API
# =====================================================
@router.post("/check")
def check_service(service: ServiceCreate):

    try:

        result = check_api(service.url)

        return {
            "service_name": service.name,
            "url": service.url,
            "result": result
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =====================================================
# Dashboard Statistics
# =====================================================
@router.get("/stats")
def get_stats():

    results = get_all_services()

    total = len(results)

    healthy = len(
        [x for x in results if x["status"] == "UP"]
    )

    warning = len(
        [x for x in results if x["status"] == "WARNING"]
    )

    down = len(
        [x for x in results if x["status"] == "DOWN"]
    )

    response_times = [

        x["response_time"]

        for x in results

        if isinstance(x["response_time"], (int, float))

    ]

    average_response = (

        round(
            sum(response_times) / len(response_times),
            2
        )

        if response_times else 0

    )

    return {

        "total_apis": total,

        "healthy": healthy,

        "warning": warning,

        "down": down,

        "average_response_time": average_response

    }


# =====================================================
# Delete API
# =====================================================
@router.delete("/delete/{service_name}")
def delete_service(service_name: str):

    result = services_collection.delete_one(
        {"name": service_name}
    )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Service not found."
        )

    return {

        "success": True,
        "message": "Service deleted successfully."

    }