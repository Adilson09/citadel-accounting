from rest_framework import generics
from .models import Sale
from .serializers import SaleSerializer
from rest_framework.response import Response
from rest_framework import status
from .forms import SaleForm, SaleItemForm

class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    # def perform_create(self, serializer):
    #     items_data = self.request.data.get('items', [])
    #     serializer.save(items=items_data)

class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    # def perform_update(self, serializer):
    #     items_data = self.request.data.get('items', [])
    #     serializer.save(items=items_data)




