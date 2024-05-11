from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("test", views.test),
    path("get-question/", views.get_question),
]
