from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("<int:test>/test/", views.test),
    path("<int:test>/get-question/", views.get_question),
    path("<int:test>/get-test-info/", views.get_test_info),
    path("select-test/", views.select_test),
    path("average-score/", views.average_score),
]
