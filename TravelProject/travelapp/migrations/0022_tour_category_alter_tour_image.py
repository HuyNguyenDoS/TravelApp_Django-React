# Generated by Django 4.0.4 on 2022-04-27 08:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travelapp', '0021_tour_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='tour',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tours', to='travelapp.category'),
        ),
        migrations.AlterField(
            model_name='tour',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='tours/%Y/%m'),
        ),
    ]
