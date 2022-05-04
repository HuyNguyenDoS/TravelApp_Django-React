from django.contrib import admin
from .models import Tour, TourGuide, Ticket, Department, Arrival, Transport, Hotel, Customer, User,Category
from django.urls import path
from django.utils.html import mark_safe
from django.template.response import TemplateResponse
from django.db.models import Count
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

class TourForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Tour
        fields = '__all__'

class TourAdmin(admin.ModelAdmin):
    list_display = ("id", "name_tour", "active")

class TourGuideAdmin(admin.ModelAdmin):
    readonly_fields = ['imageTourGuide']

class TravelappAdmin(admin.ModelAdmin):
    search_fields = ['subject', 'category']
    readonly_fields = ['image_view']

    def image_view(self, course):
        if course:
            return mark_safe(
                '<img src="/static/{url}" width="120" />' \
                    .format(url=course.image.name)
            )




class CategoryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name', 'created_date']
    list_display = ['id', 'name', 'created_date']


admin.site.register(User)
admin.site.register(Category)
admin.site.register(Tour, TourAdmin)
admin.site.register(TourGuide)
admin.site.register(Ticket)
admin.site.register(Department)
admin.site.register(Arrival)
admin.site.register(Transport)
admin.site.register(Hotel)
admin.site.register(Customer)