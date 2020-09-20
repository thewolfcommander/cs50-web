from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . models import User, Task, Offer, Question

class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "poster", "assignee", "budget", "timestamp", "status")

class OfferAdmin(admin.ModelAdmin):
    list_display = ("id", "task", "tasker", "timestamp")

class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "commenter", "timestamp", "content")

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Offer, OfferAdmin)
admin.site.register(Question, QuestionAdmin)