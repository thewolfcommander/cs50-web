from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listing(models.Model):
    LISTING_CATEGORIES = [
        ('BOOKS', 'Books'),
        ('MUSIC', 'Music'),
        ('MOVIES', 'Movies'),
        ('GAMES', 'Games'),
        ('COMPUTERS', 'Computers'),
        ('ELECTRONICS', 'Electronics'),
        ('KITCHEN', 'Kitchen'),
        ('HOME', 'Home'),
        ('HEALTH', 'Health'),
        ('PETS', 'Pets'),
        ('TOYS', 'Toys'),
        ('FASHION', 'Fashion'),
        ('SHOES', 'Shoes'),
        ('SPORTS', 'Sports'),
        ('BABY', 'Baby'),
        ('TRAVEL', 'Travel')
    ]

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings", null=True)
    title = models.CharField(max_length=200, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    price = models.DecimalField(decimal_places=2, verbose_name="Starting Bid", max_digits=15)
    image = models.URLField(blank=True, verbose_name="Image URL", null=True)
    category = models.CharField(choices=LISTING_CATEGORIES, blank=True, verbose_name="Category", max_length=200, null=True)

    def __str__(self):
        return self.title

class Bid(models.Model):
    pass

class Comment(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments", null=True)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments", null=True)
    content = models.TextField(verbose_name="Comment", default="")
    timestamp = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.commenter} commented on {self.listing} ({self.timestamp.date()})"