import logging
from typing import Optional

from django.conf import settings
from djoser.social.views import ProviderAuthView
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

logger = logging.getLogger(__name__)


def set_auth_cookies(response: Response, access_token: str, refresh_token: Optional[str] = None) -> None:
    access_token_lifetime = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(
    )
    cookie_settings = {
        "path": settings.COOKIE_PATH,
        "secure": settings.COOKIE_SECURE,
        "httponly": settings.COOKIE_HTTPONLY,
        "samesite": settings.COOKIE_SAMESITE,
        "max_age": access_token_lifetime
    }
    response.set_cookie("access", access_token, **cookie_settings)

    if refresh_token:
        refresh_token_lifetime = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds(
        )
        refresh_cookie_settings = cookie_settings.copy()
        refresh_cookie_settings["max_age"] = refresh_token_lifetime
        response.set_cookie("refresh", refresh_token,
                            **refresh_cookie_settings)

    logged_in_cookie_settings = cookie_settings.copy()
    logged_in_cookie_settings["httponly"] = False
    response.set_cookie("logged_in", "true", **logged_in_cookie_settings)


def process_auth_response(response: Response, success_message: str) -> Response:
    if response.status_code not in (200, 201):
        return response

    data = getattr(response, "data", {})

    access_token = data.get("access")
    refresh_token = data.get("refresh")

    if access_token and refresh_token:
        set_auth_cookies(
            response, access_token=access_token, refresh_token=refresh_token
        )

        response.data.pop("access", None)
        response.data.pop("refresh", None)

        response.data["message"] = success_message
    else:
        logger.error(
            "Access or Refreshtoken missing in authentication response")
        response.data["message"] = "Authentication Failed"
    return response


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        token_res = super().post(request, *args, **kwargs)

        return process_auth_response(token_res, "Login Successful")


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:

        refresh_res = super().post(request, *args, **kwargs)

        return process_auth_response(refresh_res, "Access token refreshed successfully.")


class CustomProviderAuthView(ProviderAuthView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        provider_res = super().post(request, *args, **kwargs)

        return process_auth_response(provider_res, "You are logged in Successfully.")


class LogoutAPIView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        response.delete_cookie("logged_in")
        return response
