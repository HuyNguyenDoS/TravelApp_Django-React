from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

#user, login, logo
router.register(prefix='users', viewset=views.UserViewSet, basename='user')

#like, rating, comment
router.register("comments", views.CommentViewSet, 'comment')

# infor tour
router.register("categories", views.CategoryViewSet, 'category')
router.register(prefix='departments', viewset=views.DepartmentViewSet, basename='department')
router.register(prefix='tours', viewset=views.TourViewSet, basename='tour')
router.register(prefix='tourguides', viewset=views.TourguideViewSet, basename='tourguide')
router.register(prefix='hotels', viewset=views.HotelViewSet, basename='hotel')
router.register(prefix='arrivals', viewset=views.ArrivalViewSet, basename='arrival')

#bai viet
router.register(prefix='articals', viewset=views.ArticalViewset, basename='artical')

urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
]