from datetime import datetime

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver

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
    challan_no = models.CharField(max_length=16, blank=True)
    total_fee = models.IntegerField()
    amount = models.IntegerField()
    transfer_id = models.CharField(max_length=32)
    transfer_date = models.DateField()
    account_officer = models.ForeignKey(User, on_delete=models.CASCADE)


class FeeRegister(Timestamp):
    STATUS = (
        ('0', 'pending'),
        ('1', 'accept'),
        ('2', 'deny'),
    )
    form_id = models.CharField(max_length=16, blank=True)
    session = models.CharField(max_length=16, blank=True)
    roll_no = models.CharField(max_length=16)
    email = models.EmailField()
    transfer_date = models.DateField()
    details = JSONField()
    is_verified = models.CharField(max_length=16, choices=STATUS, default='0')

    def __str__(self):
        return self.roll_no


@receiver(post_save, sender=FeeRegister)
def save_profile(sender, instance, **kwargs):
    if not instance.form_id:
        date = datetime.today()
        month = date.month
        year = date.year
        if month < 7:
            year = year-1
        session = str(year)+'-'+str(year+1)[-2:]
        instance.session = session
        branch = instance.details.get('basic').get('branch')
        form_id = '{:02}{:02}{:03}'.format(
            int(str(year)[-2:]), int(branch), int(instance.id))
        instance.form_id = form_id
        instance.save()
