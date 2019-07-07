from django.db import models

from accounts.models import Timestamp
from students.models import Student


class Semester(Timestamp):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    total_marks = models.IntegerField()
    marks = models.IntegerField()
    year = models.IntegerField()

    def __str__(self):
        return self.student.name

    @property
    def percentage(self):
        return (self.marks*100)/self.total_marks
