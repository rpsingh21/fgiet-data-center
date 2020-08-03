import time
import threading
from django.core.management import BaseCommand

from fees.utils import send_success_reg_mail
from fees.models import FeeRegister


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        print("start testing of email function ........")
        # fee = FeeRegister.objects.get(form_id='1901042')
        # start_time = time.time()
        # # send_success_reg_mail(fee)
        # x = threading.Thread(target=send_success_reg_mail, args=(fee,))
        # x.start()
        # print("--- %s seconds ---" % (time.time() - start_time))
