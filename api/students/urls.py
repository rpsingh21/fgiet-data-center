from django.urls import path

from .views import StudentAPIView, DocumentCreateView

app_name = 'students'

urlpatterns = [
    path('', StudentAPIView.as_view(), name='student_apiview'),
    path('upload', DocumentCreateView.as_view(), name='upload_image'),
]
