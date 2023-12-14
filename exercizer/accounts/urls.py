# accounts/urls.py
from django.contrib.auth.views import LoginView
from django.contrib.auth.views import LogoutView
from django.urls import path
from .views import LoginCreateView
urlpatterns = [
    # ...
    path('login/', LoginCreateView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

]


