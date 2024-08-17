# filemanagement/views.py
from django.http import FileResponse, HttpResponseNotFound, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.apps import apps
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_file(request, entity_type, entity_id):
    entity_map = {
        'invoice': {'app': 'invoices', 'model': 'Invoice'},
        'sale': {'app': 'sales', 'model': 'Sale'},
        'report': {'app': 'reports', 'model': 'Report'},
    }

    entity_info = entity_map.get(entity_type.lower())
    if not entity_info:
        return HttpResponseNotFound('Invalid entity type')

    try:
        Model = apps.get_model(entity_info['app'], entity_info['model'])
        entity = get_object_or_404(Model, id=entity_id)
    except LookupError:
        return HttpResponseNotFound('Model not found')

    generator_module = __import__(f"filemanagement.file_handlers", fromlist=['generate_file'])
    generate_file = getattr(generator_module, f"generate_{entity_type}_file")

    file_content, content_type = generate_file(entity)
    
    response = FileResponse(file_content, content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{entity_type}_{entity_id}.{get_file_extension(content_type)}"'
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_file(request, entity_type, entity_id):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)

    file = request.FILES['file']
    entity_map = {
        'invoice': {'app': 'invoices', 'model': 'Invoice'},
        'sale': {'app': 'sales', 'model': 'Sale'},
        'report': {'app': 'reports', 'model': 'Report'},
    }

    entity_info = entity_map.get(entity_type.lower())
    if not entity_info:
        return JsonResponse({'error': 'Invalid entity type'}, status=400)

    try:
        Model = apps.get_model(entity_info['app'], entity_info['model'])
        entity = get_object_or_404(Model, id=entity_id)
    except LookupError:
        return JsonResponse({'error': 'Model not found'}, status=404)

    file_path = f"{entity_type}/{entity_id}/{file.name}"
    path = default_storage.save(file_path, ContentFile(file.read()))

    # Update the entity with the file path if needed
    # entity.file_path = path
    # entity.save()

    return JsonResponse({'success': True, 'file_path': path})

def get_file_extension(content_type):
    extensions = {
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'text/csv': 'csv',
    }
    return extensions.get(content_type, 'bin')