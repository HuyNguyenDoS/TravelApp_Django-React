from rest_framework import serializers
from .models import User, Department, Tour, Hotel, Transport, Arrival, Action, Rating, TourGuide, Comment, \
    TourView, Category, Article
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()

        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'avatar',
                  'last_name', 'email', 'date_joined', 'id', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ('category', 'id', 'title', 'image', 'slug', 'author',
#                   'excerpt', 'content', 'status')

class DepartmentSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fileds = "__all__"
        exclude = ['active']


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name_hotel']


class ArrivalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arrival
        fields = ['name_arrival', 'address']


class TourguideSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourGuide
        fields = ['name_tourguide', 'imageTourGuide', 'department']


class TransportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transport
        fields = ['id', 'name_transport', 'seat', 'name_tour']


class TourSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField(source='imageTour')
    image = SerializerMethodField()
    transports = TransportSerializer(many=True)
    hotels = HotelSerializer(many=True)
    arrivals = ArrivalSerializer(many=True)

    def get_image(self, tours):
        request = self.context['request']
        name = tours.image.name
        if name.startswith('static/'):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)

    class Meta:
        model = Tour
        fields = ['id', 'name_tour', 'created_date', 'updated_date', 'address', 'hotels', 'tourguide', 'arrivals',
                  'imageTour', 'price']


class TourDetailSerializer(TourSerializer):
    class Meta:
        model = TourSerializer.Meta.model
        fields = TourSerializer.Meta.fields


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# action, like, rating, view
class TourViewSerializer(ModelSerializer):
    class Meta:
        model = TourView
        fields = ["id", "views", "tour"]


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ["id", "type", "create_date"]


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "type", "create_date"]


class CommentSerializer(serializers.ModelSerializer):
    creator = SerializerMethodField()

    def get_creator(self, comment):
        return UserSerializer(comment.creator, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'creator']


# serializer cho bai viet
class ArticalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"
