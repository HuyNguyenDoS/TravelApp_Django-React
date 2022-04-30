from rest_framework import serializers
from .models import User, Tour, Category, Tag, Comment, Rating, TourView,Action \
    # Hotel, Transport, Arrival, TourGuide,Department
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

#
# class DepartmentSeriliazer(ModelSerializer):
#     class Meta:
#         model = Department
#         fileds = "__all__"
#         exclude = ['active']
#
#
# class HotelSerializer(ModelSerializer):
#     class Meta:
#         model = Hotel
#         fields = ['id', 'name_hotel']
#
# class ArrivalSerializer(ModelSerializer):
#     class Meta:
#         model = Arrival
#         fields = ['name_arrival', 'address']


# class TourguideSerializer(ModelSerializer):
#     image = serializers.SerializerMethodField(source='image')
#     tags = TagSeriazlier(many=True)
#
#     def get_image(self, obj):
#         request = self.context['request']
#         # if obj.image and obj.image.name.startswith("/static"):
#         #     pass
#         # else:
#         path = '/static/%s' % obj.image.name
#
#         return request.build_absolute_uri(path)
#
#     class Meta:
#         model = TourGuide
#         fields = ['imageTourGuide','created_date', 'updated_date','department','tags']


# class TransportSerializer(ModelSerializer):
#     class Meta:
#         model = Transport
#         fields = ['id', 'name_transport', 'seat']
#
# class ArrivalSerializer(ModelSerializer):
#     class Meta:
#         model = Arrival
#         fields = ['id', 'name_arrival']

class TourSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField(source='imageTour')
    image = SerializerMethodField()

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
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class TourDetailSerializer(TourSerializer):
    tags = TagSerializer(many=True)
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
        fields = TourSerializer.Meta.fields
        fields = [field.name for field in model._meta.fields]
        fields.append('tags')
        fields.append('rate')

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


class CommentSerializer(ModelSerializer):
    creator = SerializerMethodField()

    def get_creator(self, comment):
        return UserSerializer(comment.creator, context={"request": self.context.get('request')}).data

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'creator']

