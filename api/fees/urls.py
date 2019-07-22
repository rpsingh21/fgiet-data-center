from django.urls import path

from .views import (
    FeeRegisterAPIView,
    FormDetails,
    FeeRetrieveAPIView,
    FeeRegisterListAPIView,
)

app_name = 'fees'

urlpatterns = [
    path('', FeeRegisterAPIView.as_view(), name='fee_apiview'),
    path('form-details', FormDetails.as_view(), name='form'),
    path('details/<int:id>', FeeRetrieveAPIView.as_view(), name='fee_details'),
    path('admin/details', FeeRegisterListAPIView.as_view(),
         name='fee_admin_list')
]
