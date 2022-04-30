from django.contrib import admin
from .models import Tour,  User,Category,Tag, Comment
    # ,TourGuide, Ticket, Department,Arrival, Transport, Hotel, Customer,
from django.urls import path
from django.utils.html import mark_safe
from django.template.response import TemplateResponse
from django.db.models import Count
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms

class TourForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Tour
        fields = '__all__'


class TourAdmin(admin.ModelAdmin):
    form = TourForm

class TourGuideAdmin(admin.ModelAdmin):
    readonly_fields = ['imageTourGuide']

# class TravelappAdmin(admin.ModelAdmin):
#     search_fields = ['subject', 'category']
#     readonly_fields = ['image_view']
#
#     def image_view(self, course):
#         if course:
#             return mark_safe(
#                 '<img src="/static/{url}" width="120" />' \
#                     .format(url=course.image.name)
#             )
#
#     def get_urls(self):
#         return [
#                    path('course-stats/', self.stats_view)
#                ] + super().get_urls()
#
#     def stats_view(self, request):
#         c = Course.objects.filter(active=True).count()
#         stats = Course.objects.annotate(lesson_count=Count('my_lesson')).values('id', 'subject', 'lesson_count')
#
#         return TemplateResponse(request,
#                                 'admin/course-stats.html', {
#                                     'count': c,
#                                     'stats': stats
#                                 })


class CategoryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name', 'created_date']
    list_display = ['id', 'name', 'created_date']


admin.site.register(User)
admin.site.register(Category)
admin.site.register(Tour)
# admin.site.register(TourGuide)
# admin.site.register(Ticket)
# admin.site.register(Department)
# admin.site.register(Arrival)
# admin.site.register(Transport)
# admin.site.register(Hotel)
# admin.site.register(Customer)
admin.site.register(Tag)
admin.site.register(Comment)