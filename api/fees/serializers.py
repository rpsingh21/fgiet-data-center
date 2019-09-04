from rest_framework import serializers

from .models import Fee, FeeRegister
from .utils import send_success_reg_mail
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
        transfer_date = validated_data.get('fee').get('transfer_date')
        details = self.context.get('request').data
        save_data = FeeRegister.objects.create(
            roll_no=roll_no,
            email=email,
            transfer_date=transfer_date,
            details=details,
        )
        send_success_reg_mail(save_data)
        return save_data


class FeeRegisterTableSerializer(serializers.ModelSerializer):
    basic = serializers.DictField(source='details.basic')
    fee = serializers.DictField(source='details.fee')

    class Meta:
        model = FeeRegister
        fields = [
            'form_id',
            'roll_no',
            'is_verified',
            'session',
            'basic',
            'fee',
            'created_at',
        ]


class RePrintSerializer(serializers.Serializer):
    form_id = serializers.CharField()
    dob = serializers.DateField()

    class Meta:
        fields = [
            'form_id',
            'dob',
        ]

    def validate(seld, data):
        form_id = data.get('form_id')
        dob = data.get('dob').strftime('%Y-%m-%d')
        instance = FeeRegister.objects.filter(
            form_id=form_id, details__basic__dob=dob)
        if not instance.exists():
            raise serializers.ValidationError('From not exists')
        return data
