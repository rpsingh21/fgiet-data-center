from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

from accounts.models import Timestamp
from .utils import get_session, compress


class Branch(Timestamp):
    name = models.CharField(max_length=64, unique=True)
    hod = models.ForeignKey(User, on_delete=models.CASCADE)
    total_semester = models.IntegerField()

    def __str__(self):
        return self.name

    @property
    def slug(self):
        return slugify(self.name)


class Student(Timestamp):
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    UNSPECIFIED = 'UNSPECIFIED'
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (UNSPECIFIED, 'Unspecified'),
    )
    GEN = 'GEN'
    OBC = 'OBC'
    SC = 'SC'
    ST = 'ST'
    CATEGORY_CHOICES = (
        (GEN, 'Gen'),
        (OBC, 'OBC'),
        (ST, 'ST'),
        (SC, 'SC'),
    )
    MODE_OF_ADMISSION = (
        ('vacant_seat', 'Vacant Seat'),
        ('upsee', 'UPSEE'),
    )
    MODE_OF_ADMISSION_CATEGORY = (
        ('Lateral_entry', 'Lateral Entry'),
        ('FW', 'FW'),
        ('EWS', 'EWS'),
        ('other', 'other'),
    )
    roll_no = models.CharField(max_length=16, unique=True)
    name = models.CharField(max_length=64)
    image = models.URLField()
    father_name = models.CharField(max_length=64)
    mother_name = models.CharField(max_length=64)
    dob = models.DateField()
    gender = models.CharField(max_length=16, choices=GENDER_CHOICES)
    category = models.CharField(max_length=16, choices=CATEGORY_CHOICES)
    sub_category = models.CharField(max_length=16, blank=True)
    address = models.TextField()
    mobile_no = models.CharField(max_length=10)
    father_mobile_no = models.CharField(max_length=10)
    mother_mobile_no = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    addhar_no = models.CharField(max_length=16, unique=True)
    mode_of_admission = models.CharField(
        max_length=16, choices=MODE_OF_ADMISSION
    )
    mode_of_admission_category = models.CharField(
        max_length=16, choices=MODE_OF_ADMISSION_CATEGORY
    )
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    is_verified = models.NullBooleanField()

    def __str__(self):
        return self.roll_no


class Academic(models.Model):
    HIGHSCHOOL = 'HighSchool'
    INTERMEDIATE = 'Intermediate'
    UGORDIPLOMA = 'UgOrDiploma'
    ACADEMIC_TYPE = (
        (HIGHSCHOOL, 'High School'),
        (INTERMEDIATE, 'Intermediate'),
        (UGORDIPLOMA, 'Ug or Diploma'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    board = models.CharField(max_length=256)
    academic_type = models.CharField(max_length=16, choices=ACADEMIC_TYPE)
    marks = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.student.name


def upload_location(instance, filename):
    return "student/%s/%s" % (get_session(), filename)


class Document(models.Model):
    upload = models.ImageField(upload_to=upload_location)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.upload.name

    def save(self, *args, **kwargs):
        new_image = compress(self.upload)
        self.upload = new_image
        super().save(*args, **kwargs)
