
# Create your views here.
from rest_framework import generics
from .models import User
from .serializers import UserSerializer




class LoginCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer