from rest_framework import serializers
from .models import User, Tour, Category, Comment, Rating, TourView,Action, \
    Hotel, Transport, Arrival, TourGuide,Department,Article
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'avatar',
                  'last_name', 'email', 'date_joined', 'id']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        data = validated_data.copy()

        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ('category', 'id', 'title', 'image', 'slug', 'author',
#                   'excerpt', 'content', 'status')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class DepartmentSeriliazer(ModelSerializer):
    class Meta:
        model = Department
        fileds = "__all__"
        exclude = ['active']


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name_hotel']

class ArrivalSerializer(ModelSerializer):
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
        fields = ['id','name_tour', 'created_date', 'updated_date','address', 'hotels', 'tourguide', 'arrivals'
            , 'imageTour','price']


class TourDetailSerializer(TourSerializer):
    rate = SerializerMethodField()

    def get_rate(self, tour):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            r = tour.rating_set.filter(creator=request.user).first()
            if r:
                return r.rate

        return -1

    class Meta:
        model = TourSerializer.Meta.model
        fields = TourSerializer.Meta.fields + ["rate"]

class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = ["id", "rate", "created_date"]


class TourViewSerializer(ModelSerializer):
    class Meta:
        model = TourView
        fields = ["id", "views", "tour"]


class ActionSerializer(ModelSerializer):
    class Meta:
        model = Action
        fields = ["id", "type", "created_date"]


# serializer cho bai viet
class ArticalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    creator = SerializerMethodField()

    def get_creator(self, comment):
        return UserSerializer(comment.creator, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'creator']


