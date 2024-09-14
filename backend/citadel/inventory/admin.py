from django.contrib import admin
from .models import Item

# Customizing the admin interface for Item
class ItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'SKU', 'tax_type', 'quantity', 'purchase_price', 'marked_price', 'created_at', 'updated_at')  # Display fields in tabular format
    list_filter = ('tax_type', 'created_at')  # Add filters to the right-hand side for easier navigation
    search_fields = ('item_name', 'SKU')  # Add a search bar for 'item_name' and 'SKU'
    list_editable = ('quantity', 'purchase_price', 'marked_price')  # Make certain fields editable directly in the list view
    list_per_page = 20  # Display 20 records per page

# Register the model with the customized admin
admin.site.register(Item, ItemAdmin)
