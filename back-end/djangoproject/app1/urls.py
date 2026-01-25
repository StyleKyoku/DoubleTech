# back-end/myapp/urls.py
from django.urls import path
from .views import UserInfoAPI

urlpatterns = [
    path('users/', UserInfoAPI.as_view()),
]
