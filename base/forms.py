from django import forms


class AverageScoreForm(forms.Form):
    test = forms.IntegerField()
    score = forms.FloatField(min_value=0, max_value=100)
