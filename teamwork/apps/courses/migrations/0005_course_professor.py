# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-05 02:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_remove_course_professor'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='professor',
            field=models.BooleanField(default=True),
        ),
    ]
