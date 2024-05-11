from django.db import models


# Create your models here.
class Test(models.Model):
    def __str__(self):
        return self.test

    test = models.CharField(max_length=200)


class Question(models.Model):
    def __str__(self):
        if len(self.question) > 100:
            return self.question[:96] + " ..."

        return self.question[:100]

    question = models.TextField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE)


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=1000)
    correct = models.BooleanField()
