from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . models import User, Email

class EmailAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "sender", "subject", "timestamp", "read", "archived")

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Email, EmailAdmin)