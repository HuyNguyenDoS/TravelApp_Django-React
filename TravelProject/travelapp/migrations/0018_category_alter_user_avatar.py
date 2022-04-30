# Generated by Django 4.0.4 on 2022-04-23 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travelapp', '0017_auto_20220412_2335'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(null=True, upload_to='users/%Y/%m'),
        ),
    ]