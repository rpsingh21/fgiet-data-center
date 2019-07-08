from django.contrib import admin

from students.models import (
    Branch,
    Student,
)


admin.site.register(Branch)
admin.site.register(Student)
