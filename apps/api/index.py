import logging

from fastapi import FastAPI

from app import app as api
from auth.guest_auth import AUTH_KEY_SALT
from auth.user_identity import JWT_SECRET
from services.docusign_handler import DOCUSIGN_HMAC_KEY

if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET is not defined")
if not AUTH_KEY_SALT:
    raise RuntimeError("AUTH_KEY_SALT is not defined")
if not DOCUSIGN_HMAC_KEY:
    raise RuntimeError("DOCUSIGN_HMAC_KEY is not defined")

# Override AWS Lambda logging configuration
logging.basicConfig(level=logging.INFO, force=True)

# This ASGI app is used by Vercel as a Serverless Function
app = FastAPI()
app.mount("/api", api)
