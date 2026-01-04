from .base import *


DEBUG = True

SITE_NAME = getenv("SITE_NAME")
SECRET_KEY = getenv("DJANGO_SECRET_KEY",
                    "DesQDitVuOIBge83OQCKo7YjGokJYE-DJT7Rg1DNZ1a8p9ffoUA")


ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

ADMIN_URL = getenv("DJANGO_ADMIN_URL")
EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = getenv("EMAIL_HOST")
EMAIL_PORT = getenv("EMAIL_PORT")
DEFAULT_FROM_EMAIL = getenv("DEFAULT_FROM_EMAIL")
DOMAIN = getenv("DOMAIN")
