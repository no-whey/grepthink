# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-11-27 21:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_chatroom_hasproject'),
    ]

    operations = [
        migrations.CreateModel(
            name='DirectMessage',
            fields=[
                ('chatroom_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='chat.Chatroom')),
            ],
            bases=('chat.chatroom',),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='isDirectMessage',
            field=models.BooleanField(default=False),
        ),
    ]
