from rest_framework import serializers
from . models import User, Task, Offer, Question, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name")


class TaskSerializer(serializers.ModelSerializer):
    poster = UserSerializer()
    assignee = UserSerializer()

    class Meta:
        model = Task
        fields = ("id", "title", "description", "poster", "due_date", "budget", "category", "timestamp", "status", "assignee", "offers")


class OfferSerializer(serializers.ModelSerializer):
    task = TaskSerializer()
    tasker = UserSerializer()

    class Meta:
        model = Offer
        fields = ("id", "task", "price", "tasker", "message", "timestamp")


class QuestionSerializer(serializers.ModelSerializer):
    task = TaskSerializer()
    commenter = UserSerializer()

    class Meta:
        model = Question
        fields = ("id", "task", "commenter", "content", "timestamp")


class ReviewSerializer(serializers.ModelSerializer):
    task = TaskSerializer()
    reviewer = UserSerializer()
    reviewee = UserSerializer()

    class Meta:
        model = Review
        fields = ("id", "task", "reviewer", "reviewee", "rating", "content", "timestamp")