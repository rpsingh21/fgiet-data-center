from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django_filters import rest_framework as filters

from .models import FeeRegister, Fee
from students import models as sm, utils
from .serializers import (
    FeeSerializer,
    FeeRegisterSerializer,
    FeeRegisterFormSerializer,
    FeeRegisterTableSerializer,
    RePrintSerializer,
)


class FeeRegisterAPIView(APIView):
    serializer_class = FeeRegisterFormSerializer

    def get(self, request, id=None):
        if id:
            instance = FeeRegister.objects.get(id=id)
            serializer = FeeSerializer(instance, context={'request': request})
        else:
            instance = FeeRegister.objects.all()
            serializer = FeeSerializer(instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = FeeRegisterFormSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            instance = serializer.save()
            response = FeeRegisterSerializer(instance).data
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FormDetails(APIView):

    def get(self, request):
        session_list = list(
            set(FeeRegister.objects.values_list('session', 'session')))
        data = {
            'category': dict(sm.Student.CATEGORY_CHOICES),
            'mode_of_admission': dict(sm.Student.MODE_OF_ADMISSION),
            'admission_category': dict(sm.Student.MODE_OF_ADMISSION_CATEGORY),
            'academic_type': dict(sm.Academic.ACADEMIC_TYPE),
            'fee_type': dict(Fee.FEE_TYPE),
            'branch': dict(sm.Branch.objects.values_list('id', 'name')),
            'semester': dict(
                sm.Branch.objects.values_list('id', 'total_semester')),
            'year': [1, 2, 3, 4],
            'gender': dict(sm.Student.GENDER_CHOICES),
            'mode_of_payment': dict(Fee.PAYMENT_TYPE),
            'session': dict(session_list),
            'status': dict(FeeRegister.STATUS)
        }
        return Response(data, status=status.HTTP_200_OK)


class FeeRetrieveAPIView(RetrieveAPIView):
    serializer_class = FeeRegisterSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = 'form_id'
    queryset = FeeRegister.objects.all()


class FeeRegisterFilter(filters.FilterSet):

    year = filters.CharFilter(field_name='details__fee__year')
    branch = filters.CharFilter(field_name='details__basic__branch')
    status = filters.CharFilter(field_name='is_verified')
    fee_type = filters.CharFilter(field_name='details__fee__fee_type')
    mode_of_payment = filters.CharFilter(
        field_name='details__fee__mode_of_payment')
    transfer_date_to = filters.CharFilter(
        field_name='transfer_date', lookup_expr='gte')
    transfer_date_from = filters.CharFilter(
        field_name='transfer_date', lookup_expr='lte')

    class Meta:
        model = FeeRegister
        fields = (
            'roll_no',
            'form_id',
            'session',
            'status',
            'year',
            'transfer_date_to',
            'transfer_date_from',
            'branch',
            'mode_of_payment',
        )


class FeeRegisterListAPIView(ListAPIView):
    serializer_class = FeeRegisterTableSerializer
    permission_classes = (IsAuthenticated,)
    queryset = FeeRegister.objects.all().order_by('-created_at')
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FeeRegisterFilter


class RePrintAPIView(APIView):
    serializer_class = RePrintSerializer

    def get(self, request):
        try:
            token = request.GET.get('token')
            form_id = utils.valid_jwt_token(token)
            instance = get_object_or_404(FeeRegister, form_id=form_id)
            serializer = FeeRegisterSerializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response(
                {'error': str(ex)}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request):
        serializer = RePrintSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            token = utils.get_jwt_token(serializer.data.get('form_id'))
            response = {'token': token}
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
