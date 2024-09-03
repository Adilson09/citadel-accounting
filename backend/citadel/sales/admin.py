# from django.contrib import admin
# from .models import *

# admin.site.register(Sale)

from django.contrib import admin
from .models import Sale, SaleItem

class SaleItemInline(admin.TabularInline):  # Use `TabularInline` for a more compact display
    model = SaleItem
    extra = 1  # Number of extra blank forms to show

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    inlines = [SaleItemInline]
    list_display = ['id', 'customer', 'sale_date', 'total']
    search_fields = ['customer__name', 'sale_date']
