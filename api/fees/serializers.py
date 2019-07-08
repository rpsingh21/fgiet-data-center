from rest_framework import serializers

from .models import Fee, FeeRegister
from students.serializers import StudentModelSerializer
from semesters.serialiers import SemesterSerializer


class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = '__all__'


class FeeRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeRegister
        fields = '__all__'


class FeeRegisterFormSerializer(serializers.Serializer):
    student_details = StudentModelSerializer()
    semester_details = SemesterSerializer(many=True)
    fee_details = FeeSerializer()
