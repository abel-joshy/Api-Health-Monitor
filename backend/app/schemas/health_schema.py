import requests
import time

def check_api(url: str):

    start_time = time.time()

    try:
        response = requests.get(url, timeout=5)

        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        return {
            "status": "UP",
            "status_code": response.status_code,
            "response_time_ms": response_time
        }

    except Exception as e:

        return {
            "status": "DOWN",
            "error": str(e)
        }