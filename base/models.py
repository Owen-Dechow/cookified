from django.db import models


# Create your models here.
class Question(models.Model):
    def __str__(self):
        if len(self.question) > 30:
            return self.question[:26] + " ..."

        return self.question[:30]

    question = models.TextField()


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=1000)
    correct = models.BooleanField()
