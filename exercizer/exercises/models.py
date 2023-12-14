from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    reps = models.PositiveIntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateTimeField(default=timezone.now)
    volume = models.DecimalField(max_digits=8, decimal_places=2, default= 0)  # Store the calculated volume here


    def __str__(self):
        return self.name

class WorkoutLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ManyToManyField(Exercise)
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return f"{self.user.username}'s workout on {self.date}"
