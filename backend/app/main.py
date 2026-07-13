from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.monitor import router as monitor_router

app = FastAPI(
    title="API Health Monitor",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    monitor_router,
    prefix="/api/monitor",
    tags=["Monitor"]
)

@app.get("/")
def home():
    return {
        "message": "API Health Monitor Backend Running"
    }