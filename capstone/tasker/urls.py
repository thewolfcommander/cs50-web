from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/tasks/", views.tasks_collection),
    path("api/tasks/<int:task_id>", views.task_element),
    path("api/questions/", views.questions_collection),
    path("api/tasks/<int:task_id>/questions", views.task_questions_collection),
    path("api/offers", views.offers_collection),
    path("api/tasks/<int:task_id>/offers", views.task_offers_collection),
    path("api/offers/<int:offer_id>", views.offer_element),
    path("api/reviews", views.reviews_collection),
    path("api/users/<str:username>/reviews", views.user_reviews_collection)
]