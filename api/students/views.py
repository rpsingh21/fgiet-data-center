from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from .models import Student, Document
from .serializers import (
    StudentModelSerializer,
    DocumentSerializer,
)


class StudentAPIView(APIView):

    serializer_class = StudentModelSerializer

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentModelSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        return request.body


class DocumentCreateView(CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
