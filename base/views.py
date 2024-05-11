from random import randrange
from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.handlers.wsgi import WSGIRequest
from . import models


# Create your views here.
def home(request: WSGIRequest):
    return render(request, "base/home.html", {"tests": models.Test.objects.all()})


def test(request: WSGIRequest, test: int):
    response = render(
        request, "base/test.html", {"test": get_object_or_404(models.Test, id=test)}
    )
    response.set_cookie("test", test)

    return response


def get_question(request: WSGIRequest, test: int):
    questions_answered = [
        int(x) for x in request.COOKIES.get("questions", "").split(",") if x
    ]

    question = (
        models.Question.objects.order_by("?")
        .filter(test=test)
        .exclude(id__in=questions_answered)
        .first()
    )

    if question is None:
        raise Http404("No question found")

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


def get_test_info(request: WSGIRequest, test: int):
    total_number_of_questions = models.Question.objects.filter(test=test).count()
    return JsonResponse({"totalquestions": total_number_of_questions})


def select_test(request: WSGIRequest):
    test = get_object_or_404(models.Test, id=request.GET.get("test"))
    return HttpResponseRedirect(f"/{test.id}/test/")
