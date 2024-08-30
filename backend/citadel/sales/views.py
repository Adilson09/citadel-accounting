# from rest_framework import generics
# from .models import Sale
# from .serializers import SaleSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from .forms import SaleForm, SaleItemForm

# class SaleListCreateView(generics.ListCreateAPIView):
#     queryset = Sale.objects.all()
#     serializer_class = SaleSerializer

#     # def perform_create(self, serializer):
#     #     items_data = self.request.data.get('items', [])
#     #     serializer.save(items=items_data)

# class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Sale.objects.all()
#     serializer_class = SaleSerializer

#     # def perform_update(self, serializer):
#     #     items_data = self.request.data.get('items', [])
#     #     serializer.save(items=items_data)



from rest_framework import generics, status
from rest_framework.response import Response
from .models import Sale
from .serializers import SaleSerializer

class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()
