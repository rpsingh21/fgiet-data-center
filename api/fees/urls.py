from django.urls import path

from .views import FeeRegisterAPIView

app_name = 'fees'

urlpatterns = [
    path('', FeeRegisterAPIView.as_view(), name='fee_apiview')
]
