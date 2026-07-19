from app.core.database import services_collection


def seed_services():

    services = [

        {
            "name": "Health API",
            "url": "http://localhost:8000/api/monitor/health",
            "method": "GET",
            "category": "System"
        },

        {
            "name": "Monitor All",
            "url": "http://localhost:8000/api/monitor/all",
            "method": "GET",
            "category": "Monitoring"
        },

        {
            "name": "Statistics API",
            "url": "http://localhost:8000/api/monitor/stats",
            "method": "GET",
            "category": "Monitoring"
        },

        {
            "name": "Authentication Service",
            "url": "http://localhost:8000/health/auth",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "User Service",
            "url": "http://localhost:8000/health/users",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Admin Service",
            "url": "http://localhost:8000/health/admin",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Contact Service",
            "url": "http://localhost:8000/health/contact",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Message Service",
            "url": "http://localhost:8000/health/messages",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Notification Service",
            "url": "http://localhost:8000/health/notifications",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Price Service",
            "url": "http://localhost:8000/health/prices",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Pickup Service",
            "url": "http://localhost:8000/health/pickups",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Admin Pickup Service",
            "url": "http://localhost:8000/health/admin-pickups",
            "method": "GET",
            "category": "Health"
        },

        {
            "name": "Swagger Docs",
            "url": "http://localhost:8000/docs",
            "method": "GET",
            "category": "Documentation"
        },

        {
            "name": "OpenAPI Spec",
            "url": "http://localhost:8000/openapi.json",
            "method": "GET",
            "category": "Documentation"
        }

    ]

    # Remove old services
    services_collection.delete_many({})

    # Insert new services
    services_collection.insert_many(services)

    print("✅ Services seeded successfully.")