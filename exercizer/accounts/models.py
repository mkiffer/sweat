from django.db import models


# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    #additional fields
    def __str__(self):
        return f"ok"