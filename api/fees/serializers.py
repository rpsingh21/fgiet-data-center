from rest_framework import serializers

from .models import Fee, FeeRegister
from students.serializers import (
    StudentModelSerializer,
    AcademicModelSerializer,
)
from semesters.serialiers import (
    SemesterSerializer,
)


class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fee
        fields = [
            'branch',
            'year',
            'fee_type',
            'mode_of_payment',
            'challan_no',
            'total_fee',
            'amount',
            'transfer_id',
            'transfer_date',
        ]


class FeeRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeRegister
        fields = '__all__'


class FeeRegisterFormSerializer(serializers.Serializer):
    basic = StudentModelSerializer()
    semesters = SemesterSerializer(many=True)
    academics = AcademicModelSerializer(many=True)
    fee = FeeSerializer()

    class Meta:
        fields = '__all__'

    def create(self, validated_data):
        basic_details = validated_data.get('basic')
        roll_no = basic_details.get('roll_no')
        email = basic_details.get('email')
        details = self.context.get('request').data
        save_data = FeeRegister.objects.create(
            roll_no=roll_no,
            email=email,
            details=details,
        )
        return save_data
