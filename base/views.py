import time
from random import random, randrange
from django.shortcuts import render
from django.http import JsonResponse
from django.core.handlers.wsgi import WSGIRequest


# Create your views here.
def home(request: WSGIRequest):
    return render(request, "base/home.html")


def test(request: WSGIRequest):
    return render(request, "base/test.html")


def get_question(request: WSGIRequest):
    questions_answered = [int(x) for x in request.COOKIES["questions"].split(",") if x]
    time.sleep(random())
    return JsonResponse(
        {
            "id": randrange(1, 100),
            "question": "This is some text",
            "options": [
                [f"{randrange(1, 100)}", True],
                [f"{randrange(1, 100)}", False],
                [f"{randrange(1, 100)}", False],
                [f"{randrange(1, 100)}", False],
            ],
        }
    )
