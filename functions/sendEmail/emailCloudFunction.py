from flask import escape, jsonify
import os
import smtplib
from email.message import EmailMessage
import functions_framework


@functions_framework.http
def send_email(request):
    request_json = request.get_json(silent=True)

    if not request_json:
        return 'Invalid request', 400

    email = request_json.get('email')
    subject = request_json.get('subject', 'Registration Confirmation')
    message = request_json.get('message', 'Thank you for registering!')

    if not email:
        return 'Email is required', 400

    # Construct the email
    message = EmailMessage()
    message.set_content(message_body)
    message['Subject'] = subject
    message['From'] = 'senecaregistration@info.ca'
    message['To'] = email

    # Send the email
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login('sendemail@info.ca', 'zxcasdqwe123456')
            smtp.send_message(message)
        return jsonify({'status': 'success', 'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
