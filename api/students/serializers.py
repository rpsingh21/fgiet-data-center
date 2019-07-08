from rest_framework import serializers

from .models import Student, Academic


class AcademicModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = '__all__'


class StudentModelSerializer(serializers.ModelSerializer):
    academic_set = AcademicModelSerializer(many=True)

    class Meta:
        model = Student
        fields = '__all__'
