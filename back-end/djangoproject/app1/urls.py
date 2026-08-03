# back-end/myapp/urls.py
from django.urls import path
from .views import UserInfoAPI, LoginAPI, CurrentUserAPI

urlpatterns = [
    path('users/', UserInfoAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('me/', CurrentUserAPI.as_view()),
]
