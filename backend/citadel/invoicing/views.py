from rest_framework import generics
from .models import InvoiceItem, Invoice, Customer
from .serializers import InvoiceSerializer, InvoiceItemSerializer, CustomerSerializer

class InvoiceListCreateView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

# views.py
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Invoice, Purchase, Report, Sale
from .utils import generate_file

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_file(request, entity_type, entity_id):
    model_map = {
        'invoice': Invoice,
        'purchase': Purchase,
        'report': Report,
        'sale': Sale,
    }
    
    Model = model_map.get(entity_type.lower())
    if not Model:
        return Response({'error': 'Invalid entity type'}, status=400)
    
    entity = get_object_or_404(Model, id=entity_id)
    
    file_content, content_type = generate_file(entity_type, entity)
    
    response = FileResponse(file_content, content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{entity_type}_{entity_id}.{get_file_extension(content_type)}"'
    return response

def get_file_extension(content_type):
    extensions = {
        'application/pdf': 'pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'text/csv': 'csv',
    }
    return extensions.get(content_type, 'bin')

# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('<str:entity_type>/<int:entity_id>/download/', views.download_file, name='download_file'),
]
