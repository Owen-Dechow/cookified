# Generated by Django 5.0.6 on 2024-05-11 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answer',
            field=models.CharField(max_length=1000),
        ),
    ]
