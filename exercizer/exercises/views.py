

# Create your views here.
from rest_framework import generics
from .models import Exercise, WorkoutLog
from .serializers import ExerciseSerializer, WorkoutLogSerializer
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect



class ExerciseListCreateView(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class WorkoutLogListCreateView(generics.ListCreateAPIView):
    queryset = WorkoutLog.objects.all()
    serializer_class = WorkoutLogSerializer

@login_required
def track_exercise(request):
    if request.method == 'POST':
        name = request.POST['name']
        reps = request.POST['reps']
        weight = request.POST['weight']
        date = request.POST['date']

        #get the logged-in user
        user = request.user

        # Create a new exercise instance associated with the logged-in user
        exercise = Exercise.objects.create(name=name, reps=reps, weight=weight, date=date, volume = weight*reps )
        
        # Create or get the user's workout log for the current date
        workout_log, created = WorkoutLog.objects.get_or_create(user=user, date=date)
        
        workout_log.exercises.add(exercise)
        
        return redirect('exercise_list')  # Redirect to the exercise list page

    return render(request, 'track_exercise.html')