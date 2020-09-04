from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . models import User, Listing, Bid, Comment

class ListingAdmin(admin.ModelAdmin):
    list_display = ("id", "creator", "title", "price", "category")

class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "commenter", "timestamp", "content")

class CustomUserAdmin(UserAdmin):
    filter_horizontal = ("watchlist",)
    fieldsets = UserAdmin.fieldsets + (
        ("Watchlist", {'fields': ('watchlist',)}),
    )

# Register your models here.
admin.site.register(Listing, ListingAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(User, CustomUserAdmin)

