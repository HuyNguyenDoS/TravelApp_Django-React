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
from .models import User, Department, Tour, Action, TourGuide, Hotel, Arrival
from .serializers import UserSerializer, DepartmentSeriliazer, TourSerializer, \
    ActionSerializer, RateSerializer, TourDetailSerializer, TourguideSerializer, \
    HotelSerializer, ArrivalSerializer

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


class DepartmentViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSeriliazer

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(name__icontains=kw)

        return query

    @action(methods=['get'], detail=False, url_path="get_department")
    def get_department(self, request, pk):
        department = self.get_object().department

        return Response(data=DepartmentSeriliazer(many=True, context={'requets': request}).data,
                        status=status.HTTP_200_OK)


class TourguideViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = TourGuide.objects.all()
    serializer_class = TourguideSerializer

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(name__icontains=kw)

        return query

class HotelViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(name__icontains=kw)

        return query

class ArrivalViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Arrival.objects.all()
    serializer_class = ArrivalSerializer

    def get_queryset(self):
        query = self.queryset

        kw = self.request.query_params.get('kw')
        if kw:
            query = query.filter(name__icontains=kw)

        return query

class TourViewSet(viewsets.ViewSet, APIView):
    queryset = Tour.objects.filter(active=True)
    serializer_class = TourSerializer

    @swagger_auto_schema(
        operation_description='Get the lessons of a course',
        responses={
            status.HTTP_200_OK: TourSerializer()
        }
    )

    # def get_queryset(self):
    #     query = self.queryset
    #
    #     kw = self.request.query_params.get('kw')
    #     if kw:
    #         query = query.filter(name__icontains=kw)
    #
    #     tour_id = self.request.query_params.get('tour_id')
    #     if tour_id:
    #         query = query.filter(tour_id=tour_id)
    #
    #     return query

    # @action(methods=['get'], detail=True, url_path='tours')
    # def get_tour_detail(self, request, pk):
    #     tours = self.get_object()
    #     kw = request.query_params.get('kw')
    #
    #     if kw:
    #         tour = tours.filter(subject__icontains=kw)
    #
    #     return Response(data=TourSerializer(tour, many=True, context={'request': request}).data,
    #              status=status.HTTP_200_OK)



    @action(methods=['post'], detail=True, url_path='like')
    def like(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Action.objects.creat(type=action_type)

            return Response(ActionSerializer(action.data),
                            status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True, url_path='rate')
    def rate(self, request, pk):
        try:
            rate = int(request.data['rate'])
        except Union[IndexError, ValueError]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = rate.objects.creat(type=rate)

            return Response(RateSerializer(r.data),
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