# filemanagement/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('download/<str:entity_type>/<int:entity_id>/', views.download_file, name='download_file'),
    path('upload/<str:entity_type>/<int:entity_id>/', views.upload_file, name='upload_file'),
]
