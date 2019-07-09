from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import FeeRegister
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

    def post(self, request):
        serializer = FeeRegisterFormSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            # serializer.save()
            response = serializer.data
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
