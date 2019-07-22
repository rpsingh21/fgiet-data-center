from rest_framework import serializers

from .models import Student, Academic, Document


class AcademicModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = ['academic_type', 'board', 'marks']


class StudentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
