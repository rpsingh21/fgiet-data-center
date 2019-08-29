from django.contrib import admin

from .models import Fee, FeeRegister


class FeeRegisterAdmin(admin.ModelAdmin):
    list_display = ('form_id', 'roll_no', 'email', 'session', 'created_at')
    list_filter = ('session', )
    search_fields = ('form_id', 'roll_no', 'email',)


admin.site.register(Fee)
admin.site.register(FeeRegister, FeeRegisterAdmin)
