from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

from accounts.models import Timestamp
from students.models import Branch


class Fee(Timestamp):
    ACADEMIC = 'Academic'
    HOSTEL = 'Hostel'
    BOTH = 'Academic and Hostel'
    FEE_TYPE = (
        (ACADEMIC, ACADEMIC),
        (HOSTEL, HOSTEL),
        (BOTH, BOTH),
    )
    PAYMENT_TYPE = [(i, i) for i in 'RTGS,NIFT,ONLINE,CHALLAN'.split(',')]
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    year = models.IntegerField()
    fee_type = models.CharField(max_length=32, choices=FEE_TYPE)
    mode_of_payment = models.CharField(max_length=16, choices=PAYMENT_TYPE)
    challan_no = models.CharField(max_length=16)
    total_fee = models.IntegerField()
    amount = models.IntegerField()
    fee_transfer_id = models.CharField(max_length=32)
    transfer_date = models.DateField()
    account_officer = models.ForeignKey(User, on_delete=models.CASCADE)


class FeeRegister(Timestamp):
    STATUS = (
        (0, 'pending'),
        (1, 'accept'),
        (2, 'deny'),
    )
    roll_no = models.CharField(max_length=16)
    email = models.EmailField()
    details = JSONField()
    is_verified = models.CharField(max_length=16, choices=STATUS, default=1)

    def __str__(self):
        return self.roll_no
