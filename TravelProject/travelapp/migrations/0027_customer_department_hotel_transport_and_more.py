# Generated by Django 4.0.4 on 2022-05-03 17:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travelapp', '0026_alter_action_unique_together_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_customer', models.TextField()),
                ('address', models.TextField()),
                ('iden', models.CharField(max_length=10)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_department', models.CharField(max_length=50)),
                ('address', models.TextField()),
                ('phone', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_hotel', models.TextField()),
                ('address', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Transport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_transport', models.TextField()),
                ('seat', models.IntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='tour',
            name='content',
        ),
        migrations.RemoveField(
            model_name='tour',
            name='image',
        ),
        migrations.AddField(
            model_name='tour',
            name='imageTour',
            field=models.ImageField(blank=True, null=True, upload_to='imageTour/%Y/%m'),
        ),
        migrations.AddField(
            model_name='tour',
            name='price',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='TourGuide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_tourguide', models.TextField()),
                ('address', models.TextField()),
                ('imageTourGuide', models.ImageField(blank=True, null=True, upload_to='imageTourGuide/%Y/%m')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Department', to='travelapp.department')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_ticket', models.TextField()),
                ('customers', models.ManyToManyField(to='travelapp.customer')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='department', to='travelapp.department')),
                ('tour', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tour', to='travelapp.tour')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Arrival',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('name_arrival', models.TextField()),
                ('address', models.TextField()),
                ('hotel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hotel', to='travelapp.hotel')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='tour',
            name='arrivals',
            field=models.ManyToManyField(to='travelapp.arrival'),
        ),
        migrations.AddField(
            model_name='tour',
            name='customers',
            field=models.ManyToManyField(to='travelapp.customer'),
        ),
        migrations.AddField(
            model_name='tour',
            name='hotels',
            field=models.ManyToManyField(to='travelapp.hotel'),
        ),
        migrations.AddField(
            model_name='tour',
            name='tourguide',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Tour', to='travelapp.tourguide'),
        ),
        migrations.AddField(
            model_name='tour',
            name='transports',
            field=models.ManyToManyField(to='travelapp.transport'),
        ),
    ]
