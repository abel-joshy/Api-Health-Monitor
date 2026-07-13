import smtplib
from email.message import EmailMessage


def send_alert_email(api_name):
    sender_email = "abeljoshy07@gmail.com"
    sender_password = "oczi pebi qbqi zquu"

    receiver_email = "abeljoshy07@gmail.com"

    msg = EmailMessage()

    msg["Subject"] = f"🚨 {api_name} API Down"

    msg["From"] = sender_email
    msg["To"] = receiver_email

    msg.set_content(
        f"""
{api_name} became unavailable.

Time:
{__import__('datetime').datetime.now()}

Please check the server immediately.
"""
    )

    with smtplib.SMTP_SSL(
        "smtp.gmail.com",
        465
    ) as smtp:
        smtp.login(
            sender_email,
            sender_password
        )

        smtp.send_message(msg)