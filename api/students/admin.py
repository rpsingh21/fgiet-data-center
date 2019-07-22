from django.contrib import admin

from students.models import (
    Branch,
    Student,
    Document,
)


admin.site.register(Branch)
admin.site.register(Student)
admin.site.register(Document)
