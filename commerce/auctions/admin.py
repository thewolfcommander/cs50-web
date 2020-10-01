from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . models import User, Listing, Bid, Comment

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ("id", "creator", "title", "timestamp", "price", "category", "active", "winner")

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "commenter", "timestamp", "content")

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ("id", "listing", "bidder", "timestamp", "bid_price")

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    filter_horizontal = ("watchlist",)
    fieldsets = UserAdmin.fieldsets + (
        ("Watchlist", {'fields': ('watchlist',)}),
    )
