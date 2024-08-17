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


from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse

def generate_pdf(request, invoice_id):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="invoice_{invoice_id}.pdf"'

    c = canvas.Canvas(response, pagesize=letter)
    c.drawString(100, 750, f"Invoice {invoice_id}")
    # Add more drawing operations to generate the invoice content
    c.save()
    return response
