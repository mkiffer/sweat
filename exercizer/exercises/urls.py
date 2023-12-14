from django.urls import path
from .views import ExerciseListCreateView, WorkoutLogListCreateView

urlpatterns = [
    path('exercises/', ExerciseListCreateView.as_view(), name='exercise-list-create'),
    path('workout-logs/', WorkoutLogListCreateView.as_view(), name='workout-log-list-create'),
]
