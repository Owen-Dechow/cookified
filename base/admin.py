from django.contrib import admin
from .models import Answer, Question, Test


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1


class QuestionAdmin(admin.ModelAdmin):
    inlines = [
        AnswerInline,
    ]


admin.site.register(Test)
admin.site.register(Question, QuestionAdmin)
