# from rest_framework import generics
# from .models import Sale
# from .serializers import SaleSerializer
# from rest_framework.response import Response
# from rest_framework import status

# class SaleListCreateView(generics.ListCreateAPIView):
#     queryset = Sale.objects.all()
#     serializer_class = SaleSerializer

#     def perform_create(self, serializer):
#         items_data = self.request.data.get('items', [])
#         serializer.save(items=items_data)

# class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Sale.objects.all()
#     serializer_class = SaleSerializer

#     def perform_update(self, serializer):
#         items_data = self.request.data.get('items', [])
#         serializer.save(items=items_data)


from rest_framework import generics, status
from rest_framework.response import Response
from django.db import transaction
from .models import Sale, SaleItem
from .serializers import SaleSerializer, SaleItemSerializer

class SaleListCreateView(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        sale_serializer = self.get_serializer(data=request.data)
        sale_serializer.is_valid(raise_exception=True)
        
        items_data = request.data.get('items', [])
        if not items_data:
            return Response({"error": "At least one item is required for a sale."}, status=status.HTTP_400_BAD_REQUEST)

        sale = sale_serializer.save()

        for item_data in items_data:
            item_data['sale'] = sale.id
            item_serializer = SaleItemSerializer(data=item_data)
            item_serializer.is_valid(raise_exception=True)
            item_serializer.save()

        sale.save()  # This will trigger the recalculation of totals

        headers = self.get_success_headers(sale_serializer.data)
        return Response(sale_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        items_data = request.data.get('items', [])

        # Delete existing items not in the updated data
        existing_item_ids = [item.id for item in instance.saleitems.all()]
        updated_item_ids = [item.get('id') for item in items_data if item.get('id')]
        for item_id in existing_item_ids:
            if item_id not in updated_item_ids:
                SaleItem.objects.filter(id=item_id).delete()

        # Update or create items
        for item_data in items_data:
            item_id = item_data.get('id')
            if item_id:
                item_instance = SaleItem.objects.get(id=item_id, sale=instance)
                item_serializer = SaleItemSerializer(item_instance, data=item_data, partial=True)
            else:
                item_data['sale'] = instance.id
                item_serializer = SaleItemSerializer(data=item_data)
            
            item_serializer.is_valid(raise_exception=True)
            item_serializer.save()

        instance = serializer.save()
        instance.save()  # Trigger recalculation of totals

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Reverse the quantity changes for each item
        for sale_item in instance.saleitems.all():
            item = sale_item.item
            item.quantity += sale_item.sale_quantity
            item.save()
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)