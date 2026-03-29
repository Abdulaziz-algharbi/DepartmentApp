from django.urls import path

from .views import ApartmentCreateAPIView, ApartmentListAPIView, ApartmentDetailAPIView

urlpatterns = [
    path("add/", ApartmentCreateAPIView.as_view(), name="add-apartment"),
    path("my-apartments/", ApartmentListAPIView.as_view(), name="list-apartments"),
    path("my-apartments/<uuid:id>/",
         ApartmentDetailAPIView.as_view(), name="detail-apartment")
]
