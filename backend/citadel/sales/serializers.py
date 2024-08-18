# from rest_framework import serializers
# from .models import Sale, SaleItem
# from inventory.models import Item
# from invoicing.models import Customer

# class SaleItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SaleItem
#         fields = '__all__'

# class SaleSerializer(serializers.ModelSerializer):
#     saleitem_set = SaleItemSerializer(many=True, required=False)  # Add this field

#     class Meta:
#         model = Sale
#         fields = '__all__'

#     def create(self, validated_data):
#         sale_items_data = validated_data.pop('saleitem_set', [])
#         sale = Sale.objects.create(**validated_data)
#         for item_data in sale_items_data:
#             SaleItem.objects.create(sale=sale, **item_data)
#         return sale

#     def update(self, instance, validated_data):
#         sale_items_data = validated_data.pop('saleitem_set', [])
#         instance.customer = validated_data.get('customer', instance.customer)
#         instance.sale_date = validated_data.get('sale_date', instance.sale_date)
#         instance.tax_type = validated_data.get('tax_type', instance.tax_type)
#         instance.save()

#         # Update SaleItems
#         existing_items = {item.id: item for item in instance.saleitem_set.all()}
#         for item_data in sale_items_data:
#             item_id = item_data.get('id')
#             if item_id:
#                 item = existing_items.pop(item_id, None)
#                 if item:
#                     item.sale_quantity = item_data.get('sale_quantity', item.sale_quantity)
#                     item.selling_price = item_data.get('selling_price', item.selling_price)
#                     item.save()
#             else:
#                 SaleItem.objects.create(sale=instance, **item_data)

#         # Delete removed items
#         for item in existing_items.values():
#             item.delete()

#         return instance

from rest_framework import serializers
from .models import Sale, SaleItem
from inventory.models import Item
from invoicing.models import Customer

class SaleItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.item_name', read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'item', 'item_name', 'sale_quantity', 'selling_price', 'sub_total']
        read_only_fields = ['sub_total']

    def validate(self, data):
        item = data['item']
        sale_quantity = data['sale_quantity']
        if sale_quantity > item.quantity:
            raise serializers.ValidationError(f"Not enough stock for {item.item_name}. Available: {item.quantity}")
        return data

class SaleSerializer(serializers.ModelSerializer):
    saleitems = SaleItemSerializer(many=True, required=False)
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Sale
        fields = ['id', 'customer', 'customer_name', 'sale_date', 'tax_type', 'sub_total', 'tax_amount', 'total', 'saleitems']
        read_only_fields = ['sub_total', 'tax_amount', 'total']

    def create(self, validated_data):
        sale_items_data = validated_data.pop('saleitems', [])
        sale = Sale.objects.create(**validated_data)
        for item_data in sale_items_data:
            SaleItem.objects.create(sale=sale, **item_data)
        sale.save()  # This will trigger the recalculation of totals
        return sale

    def update(self, instance, validated_data):
        sale_items_data = validated_data.pop('saleitems', [])
        instance.customer = validated_data.get('customer', instance.customer)
        instance.sale_date = validated_data.get('sale_date', instance.sale_date)
        instance.tax_type = validated_data.get('tax_type', instance.tax_type)

        # Update or create SaleItems
        existing_items = {item.id: item for item in instance.saleitems.all()}
        for item_data in sale_items_data:
            item_id = item_data.get('id')
            if item_id:
                item = existing_items.pop(item_id, None)
                if item:
                    # Restore previous quantity before updating
                    item.item.quantity += item.sale_quantity
                    item.item.save()
                    
                    for attr, value in item_data.items():
                        setattr(item, attr, value)
                    item.save()
            else:
                SaleItem.objects.create(sale=instance, **item_data)

        # Delete removed items
        for item in existing_items.values():
            # Restore quantity for deleted items
            item.item.quantity += item.sale_quantity
            item.item.save()
            item.delete()

        instance.save()  # This will trigger the recalculation of totals
        return instance

    def validate(self, data):
        if not data.get('saleitems'):
            raise serializers.ValidationError("At least one item is required for a sale.")
        return data