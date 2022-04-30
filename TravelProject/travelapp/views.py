from typing import Union
from django.shortcuts import render, get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.views.generic import View
from .paginators import BasePaginator
from .models import User, Rating, Comment, Tour, Category, TourView,Action,Tag
# , Department, TourGuide, Hotel, Arrival , Like
from .serializers import UserSerializer, CategorySerializer, TourSerializer, CommentSerializer, ActionSerializer, \
    TourDetailSerializer, TourViewSerializer, RatingSerializer
    # , TourguideSerializer,  CreateCommentSerializer,\
  #   HotelSerializer, ArrivalSerializer , DepartmentSeriliazer
from .perms import CommentOwnerPerms
from django.db.models import F
from django.http import Http404


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data,
                        status=status.HTTP_200_OK)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK )


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# class DepartmentViewSet(viewsets.ViewSet, generics.CreateAPIView):
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSeriliazer
#
#     def get_queryset(self):
#         query = self.queryset
#
#         kw = self.request.query_params.get('kw')
#         if kw:
#             query = query.filter(name__icontains=kw)
#
#         return query
#
#     @action(methods=['get'], detail=False, url_path="get_department")
#     def get_department(self, request, pk):
#         department = self.get_object().department
#
#         return Response(data=DepartmentSeriliazer(many=True, context={'requets': request}).data,
#                         status=status.HTTP_200_OK)


# class TourguideViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
#     queryset = TourGuide.objects.all()
#     serializer_class = TourguideSerializer
#
#     def get_queryset(self):
#         query = self.queryset
#
#         kw = self.request.query_params.get('kw')
#         if kw:
#             query = query.filter(name__icontains=kw)
#
#         return query
#
# class HotelViewSet(viewsets.ViewSet, generics.CreateAPIView):
#     queryset = Hotel.objects.all()
#     serializer_class = HotelSerializer
#
#     def get_queryset(self):
#         query = self.queryset
#
#         kw = self.request.query_params.get('kw')
#         if kw:
#             query = query.filter(name__icontains=kw)
#
#         return query
#
# class ArrivalViewSet(viewsets.ViewSet, generics.CreateAPIView):
#     queryset = Arrival.objects.all()
#     serializer_class = ArrivalSerializer
#
#     def get_queryset(self):
#         query = self.queryset
#
#         kw = self.request.query_params.get('kw')
#         if kw:
#             query = query.filter(name__icontains=kw)
#
#         return query


class TourViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = Tour.objects.filter(active=True)
    serializer_class = TourDetailSerializer
    pagination_class = BasePaginator

    def get_queryset(self):
        tours = Tour.objects.filter(active=True)

        q = self.request.query_params.get('q')
        if q is not None:
            tours = tours.filter(name_tour__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id is not None:
            tours = tours.filter(category_id=cate_id)

        return tours

    def get_permissions(self):
        if self.action in ['add_comment', 'take_action', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['post'], detail=True, url_path="tags")
    def add_tag(self, request, pk):
        try:
            tour = self.get_object()
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            tags = request.data.get("tags")
            if tags is not None:
                for tag in tags:
                    t, _ = Tag.objects.get_or_create(name=tag)
                    tour.tags.add(t)

                tour.save()

                return Response(self.serializer_class(tour).data,
                                status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['post'], detail=True, url_path="add-comment")
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(content=content,
                                       tour=self.get_object(),
                                       creator=request.user)

            return Response(CommentSerializer(c, context={"request": request}).data,
                            status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True, url_path='like')
    def take_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Action.objects.create(type=action_type,
                                           creator=request.user,
                                           tour=self.get_object())

            return Response(ActionSerializer(action).data,
                            status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, pk):
        try:
            rating = int(request.data['rating'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Rating.objects.update_or_create(creator=request.user,
                                                tour=self.get_object(),
                                                defaults={"rate": rating})

            return Response(RatingSerializer(r).data,
                            status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='views')
    def inc_view(self, request, pk):
        v, created = TourView.objects.get_or_create(tour=self.get_object())
        v.views = F('views') + 1
        v.save()

        # v.views = int(v.views)
        v.refresh_from_db()

        return Response(TourViewSerializer(v).data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path="comments")
    def get_comments(self, request, pk):
        l = self.get_object()
        return Response(
            CommentSerializer(l.comment_set.order_by("-id").all(), many=True, context={"request": self.request}).data,
            status=status.HTTP_200_OK)


class TourDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
        queryset = Tour.objects.filter(active=True)
        serializer_class = TourDetailSerializer

        @action(methods=['post'], detail=True, url_path='tags')
        def add_tag(self, request, pk):
            try:
                post = self.get_object()
            except Http404:
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                tags = request.data.get('tags')
                if tags is not None:
                    for tag in tags:
                        t, _ = Tag.objects.get_or_create(name=tag)
                        post.tags.add(t)

                    post.save()

                    return Response(self.serializer_class(post).data,
                                    status=status.HTTP_201_CREATED)

            return Response(status=status.HTTP_404_NOT_FOUND)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView,
                     generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]


    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data,
                        status=status.HTTP_200_OK)


#login facebook
# class PostList(generics.ListAPIView):
#
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()
#
#
# class PostDetail(generics.RetrieveAPIView):
#
#     serializer_class = PostSerializer
#
#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return get_object_or_404(Post, slug=item)
#
# # Post Search
#
#
# class PostListDetailfilter(generics.ListAPIView):
#
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['^slug']
#
#
# class CreatePost(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#
#     def post(self, request, format=None):
#         print(request.data)
#         serializer = PostSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class AdminPostDetail(generics.RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#
#
# class EditPost(generics.UpdateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()
#
#
# class DeletePost(generics.RetrieveDestroyAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()