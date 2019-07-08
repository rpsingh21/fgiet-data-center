from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Student
from .serializers import StudentModelSerializer


class StudentAPIView(APIView):

    serializer_class = StudentModelSerializer

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentModelSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        return request.body
