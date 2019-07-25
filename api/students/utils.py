from io import BytesIO
from datetime import datetime
from PIL import Image

from django.core.files import File


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
