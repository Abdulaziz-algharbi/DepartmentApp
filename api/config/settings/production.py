from .base import *


SECRET_KEY = getenv("DJANGO_SECRET_KEY")

ADMIN_URL = getenv("DJANGO_ADMIN_URL")

ALLOWED_HOSTS = []

ADMINS = getenv("ADMINS")  # A list of tuples (name, email)
