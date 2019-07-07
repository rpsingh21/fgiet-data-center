from django.db import models
from django.contrib.auth.models import User

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
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    yeaar = models.IntegerField()
    fee_type = models.CharField(max_length=32, choices=FEE_TYPE)
    payment_type = models.CharField(max_length=16)
    challan_no = models.CharField(max_length=16)
    total_fee = models.IntegerField()
    amount = models.IntegerField()
    fee_transfer_id = models.CharField(max_length=32)
    transfer_date = models.DateField()
    fee_verified = models.NullBooleanField()
    account_officer = models.ForeignKey(User, on_delete=models.CASCADE)
