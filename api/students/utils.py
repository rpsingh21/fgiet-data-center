from io import BytesIO
from datetime import datetime, timedelta
from PIL import Image
import jwt

from django.core.files import File
from django.conf import settings
from django.core.exceptions import ValidationError


def get_session(today=datetime.today()):
    year = today.year
    month = today.month
    if month < 7:
        year -= 1
    session = '{}-{}'.format(year, str(year+1)[-2:])
    return session


def compress(image):
    img = Image.open(image)
    im_io = BytesIO()
    img.thumbnail((300, 400))
    img.save(im_io, 'JPEG', quality=80)
    new_image = File(im_io, name=image.name)
    return new_image


def get_jwt_token(form_id, **kwagrs):
    exp_timedelta = kwagrs.get('timedelta', timedelta(seconds=5*60))
    expire_time = datetime.now() + exp_timedelta
    payload = {
        'form_id': form_id,
        'expire_time': str(expire_time),
    }
    jwt_token = jwt.encode(
        payload, settings.SECRET_KEY,
        algorithm='HS256'
    )
    return jwt_token.decode('utf-8')


def valid_jwt_token(token):
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
    expiry_datetime = datetime.strptime(
        payload.get('expire_time'), '%Y-%m-%d %H:%M:%S.%f')
    if expiry_datetime <= datetime.now():
        raise ValidationError('Token Expired')
    return payload.get('form_id')
