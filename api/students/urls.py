from django.urls import path

from .views import StudentAPIView

app_name = 'students'

urlpatterns = [
    path('', StudentAPIView.as_view(), name='student_apiview')
]
