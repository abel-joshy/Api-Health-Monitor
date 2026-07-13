import requests
import time
from datetime import datetime, timedelta
from app.services.email_service import send_alert_email

# Prevent email spam
last_alert_sent = {}


def check_api(url):
    try:
        start_time = time.time()

        response = requests.get(
            url,
            timeout=1
        )

        response_time = round(
            (time.time() - start_time) * 1000,
            2
        )

        if response.status_code == 200:
            status = "UP"

        elif response.status_code >= 400:
            status = "WARNING"

        else:
            status = "UNKNOWN"

        return {
            "status": status,
            "response_time_ms": response_time,
            "status_code": response.status_code
        }

    except (
        requests.exceptions.Timeout,
        requests.exceptions.ConnectionError
    ):

        current_time = datetime.now()

        # Send only one email every 10 minutes per API
        if (
            url not in last_alert_sent
            or current_time - last_alert_sent[url]
            > timedelta(minutes=10)
        ):
            try:
                send_alert_email(url)
                last_alert_sent[url] = current_time
            except Exception as email_error:
                print(
                    f"Email sending failed: {email_error}"
                )

        return {
            "status": "DOWN",
            "response_time_ms": None,
            "status_code": None
        }

    except Exception as e:
        print(
            f"Health check error for {url}: {e}"
        )

        return {
            "status": "DOWN",
            "response_time_ms": None,
            "status_code": None
        }