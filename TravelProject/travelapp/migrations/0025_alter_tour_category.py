# Generated by Django 4.0.4 on 2022-04-29 09:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travelapp', '0024_alter_tour_options_alter_tour_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tour',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tours', to='travelapp.category'),
        ),
    ]
