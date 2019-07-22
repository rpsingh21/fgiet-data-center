from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import FeeRegister, Fee
from students import models as sm
from .serializers import (
    FeeSerializer,
    # FeeRegisterSerializer,
    FeeRegisterFormSerializer
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
        # import pdb; pdb.set_trace()
        serializer = FeeRegisterFormSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            # response = serializer.data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FormDetails(APIView):

    def get(self, request):
        data = {
            'category': dict(sm.Student.CATEGORY_CHOICES),
            'mode_of_admission': dict(sm.Student.MODE_OF_ADMISSION),
            'admission_category': dict(sm.Student.MODE_OF_ADMISSION_CATEGORY),
            'academic_type': dict(sm.Academic.ACADEMIC_TYPE),
            'fee_type': dict(Fee.FEE_TYPE),
            'branch': dict(sm.Branch.objects.values_list('id', 'name')),
            'year': [1, 2, 3, 4],
            'gender': dict(sm.Student.GENDER_CHOICES),
            'mode_of_payment': dict(Fee.PAYMENT_TYPE),
        }
        return Response(data, status=status.HTTP_200_OK)
