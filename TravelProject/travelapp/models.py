from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from django.conf import settings
import datetime


class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')


#login bằng email
# class User(AbstractUser):
#     # Delete not use field
#     username = None
#     last_login = None
#     is_staff = None
#     is_superuser = None
#
#     password = models.CharField(max_length=100)
#     email = models.EmailField(max_length=100, unique=True)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []
#
#     def __str__(self):
#         return self.email
#
def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=50,null=False, unique=True)

    def __str__(self):
        return self.name


class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Department(ModelBase):
    name_department = models.CharField(max_length=50)
    address = models.TextField()
    phone = models.TextField()

    def __str__(self):
        return self.name_department


class TourGuide(ModelBase):
    name_tourguide = models.TextField()
    address = models.TextField()
    phone = models.TextField
    imageTourGuide = models.ImageField(null=True, blank=True, upload_to='imageTourGuide/%Y/%m')

    department = models.ForeignKey(Department, related_name="Department", null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name_tourguide


class Tour(ModelBase):
    name_tour = models.TextField()
    address = models.TextField()
    phone = models.TextField()
    imageTour = models.ImageField(null=True, blank=True, upload_to='imageTour/%Y/%m')
    price = models.IntegerField(default=0)

    tourguide = models.ForeignKey(TourGuide, related_name="Tour", null=True, on_delete=models.SET_NULL)
    customers = models.ManyToManyField('Customer')
    hotels = models.ManyToManyField('Hotel')
    transports = models.ManyToManyField('Transport')
    arrivals = models.ManyToManyField('Arrival')

    category = models.ForeignKey(Category, related_name='tours', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name_tour



class Ticket(ModelBase):
    name_ticket = models.TextField()

class Ticket(ModelBase):
    name_ticket = models.TextField()

    department = models.ForeignKey(Department, related_name="department", null=True, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, related_name="tour", null=True, on_delete=models.SET_NULL)
    customers = models.ManyToManyField('Customer')

    def __str__(self):
        return self.name_ticket


class Customer(ModelBase):
    name_customer = models.TextField()
    address = models.TextField()
    iden = models.CharField(max_length=10)

    def __str__(self):
        return self.name_customer

class Hotel(ModelBase):
    name_hotel = models.TextField()
    address = models.TextField()

    def __str__(self):
        return self.name_hotel


class Transport(ModelBase):
    name_transport = models.TextField()
    seat = models.IntegerField()

    def __str__(self):
        return self.name_transport


class Arrival(ModelBase):
    name_arrival = models.TextField()
    address = models.TextField()

    hotel = models.ForeignKey(Hotel, related_name="hotel", null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name_arrival


class ActionBase(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class TourView(ModelBase):
    views = models.IntegerField(default=0)
    tour = models.OneToOneField(Tour, on_delete=models.CASCADE)


class Action(ActionBase):
    LIKE, HAHA, HEART = range(3)
    ACTIONS = [
        (LIKE, 'like'),
        (HAHA, 'haha'),
        (HEART, 'heart')

    ]
    type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Rating(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class Article(ModelBase):
    topic = models.TextField()
    content = models.TextField()
    image_Artical = models.ImageField(null=True, upload_to='imageArtical/%Y/%m')

    def __str__(self):
        return self.topic


class Comment(ModelBase):
    content = models.TextField()
    tour = models.ForeignKey(Tour, related_name='comments', on_delete=models.CASCADE,null=True)
    artical = models.ForeignKey(Article, related_name='comments', on_delete=models.CASCADE,default="0",null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content



