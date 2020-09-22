from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass


class Task(models.Model):
    TASK_CATEGORIES = [
        ('Furniture Assembly', 'Furniture Assembly'),
        ('Delivery', 'Delivery'),
        ('Home & Gardening', 'Home & Gardening'),
        ('Business & Admin', 'Business & Admin'),
        ('Computers & IT', 'Computers & IT'),
        ('Marketing & Design', 'Marketing & Design'),
        ('Events & Photography', 'Events & Photography'),
        ('Tutoring & Training', 'Tutoring & Training'),
        ('Other', 'Other')
    ]

    TASK_STATUSES = [
        ('Open', 'Open'),
        ('Assigned', 'Assigned'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posted_tasks")
    due_date = models.DateField()
    budget = models.IntegerField()
    category = models.CharField(choices=TASK_CATEGORIES, max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=TASK_STATUSES, max_length=200, default="Open")
    assignee = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, default=None, related_name="assigned_tasks")

    def __str__(self):
        return f"(ID: {self.id}) {self.title}"


class Offer(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="offers")
    price = models.IntegerField()
    tasker = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tasker} offered to do {self.task} for ${self.price}"


class Question(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="questions")
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.commenter} commented on {self.task}"


class Review(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="reviews")
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posted_reviews")
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reviews")
    rating = models.SmallIntegerField()
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer} gave {self.reviewee} a {self.rating} star review"
