from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register("categories", views.CategoryViewSet, 'category')
router.register(prefix='tours', viewset=views.TourViewSet, basename='tour')
# router.register(prefix='tourdetail', viewset=views.TourDetailViewSet, basename='tourdetail')
router.register("comments", views.CommentViewSet, 'comment')
# router.register(prefix='departments', viewset=views.DepartmentViewSet, basename='department')
# router.register(prefix='tourguides', viewset=views.TourguideViewSet, basename='tourguide')
# router.register(prefix='hotels', viewset=views.TourguideViewSet, basename='hotel')
# router.register(prefix='arrivals', viewset=views.TourguideViewSet, basename='arrival')


urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
]