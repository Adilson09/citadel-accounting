from django.contrib import admin
from .models import Customer, Invoice, InvoiceItem

# Admin customization for Customer
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'created_at', 'updated_at')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('created_at',)
    list_per_page = 20

# Inline class for InvoiceItem to display them within the Invoice page in admin
class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    fields = ('item', 'description', 'quantity', 'unit_price', 'tax_type', 'created_at')
    extra = 1  # Number of empty inline forms to display
    readonly_fields = ('created_at',)

# Admin customization for Invoice
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'customer', 'date', 'due_date', 'total_amount', 'paid', 'created_at', 'updated_at')
    list_filter = ('date', 'due_date', 'paid')
    search_fields = ('invoice_number', 'customer__first_name', 'customer__last_name', 'customer__email')
    list_per_page = 20
    inlines = [InvoiceItemInline]  # Display InvoiceItem inline in the Invoice admin view

# Admin customization for InvoiceItem
class InvoiceItemAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'item', 'description', 'quantity', 'unit_price', 'tax_type', 'created_at', 'updated_at')
    search_fields = ('invoice__invoice_number', 'item__item_name')
    list_filter = ('tax_type', 'created_at')
    list_per_page = 20

# Register the models with their customized admin classes
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Invoice, InvoiceAdmin)
admin.site.register(InvoiceItem, InvoiceItemAdmin)
