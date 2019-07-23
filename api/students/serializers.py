from django.conf import settings
from django.template.defaultfilters import filesizeformat
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

    def validate_upload(self, image):
        size = image.size
        if size > settings.MAX_UPLOAD_SIZE:
            raise serializers.ValidationError(
                'Please keep image size under {}. Current filesize {}'
                .format(filesizeformat(
                        settings.MAX_UPLOAD_SIZE), filesizeformat(size)))
        return image
