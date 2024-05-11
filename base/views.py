from random import randrange
from django.shortcuts import render
from django.http import JsonResponse
from django.core.handlers.wsgi import WSGIRequest
from . import models


# Create your views here.
def home(request: WSGIRequest):
    return render(request, "base/home.html")


def test(request: WSGIRequest):
    return render(request, "base/test.html")


def get_question(request: WSGIRequest):
    questions_answered = [int(x) for x in request.COOKIES["questions"].split(",") if x]

    question = (
        models.Question.objects.order_by("?").exclude(id__in=questions_answered).first()
    )

    options = models.Answer.objects.filter(question=question.id)

    json_options = []
    for option in options:
        json_options.insert(
            randrange(0, len(json_options) + 1), [option.answer, option.correct]
        )

    json_question = {
        "id": question.id,
        "question": question.question,
        "options": json_options,
    }

    return JsonResponse(json_question)
