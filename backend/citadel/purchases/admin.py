from django.contrib import admin
from .models import Supplier, Purchase, PurchaseItem
from banking.models import Cheque

class PurchaseItemInline(admin.TabularInline):
    model = PurchaseItem
    extra = 1

class PurchaseAdmin(admin.ModelAdmin):
    list_display = (
        'supplier_name', 
        'purchase_date', 
        'invoice_number', 
        'get_tax_subtotal',  # Display the tax subtotal
        'sub_total', 
        'payment_method', 
        'cheque'
    )
    list_filter = ('payment_method',)
    search_fields = ('supplier_name', 'invoice_number')
    inlines = [PurchaseItemInline]

    def get_tax_subtotal(self, obj):
        return obj.tax_subtotal  # Display the tax subtotal
    get_tax_subtotal.short_description = 'Tax Subtotal'  # Label for the admin list

    def save_model(self, request, obj, form, change):
        if obj.payment_method == 'CHEQUE' and not obj.cheque:
            # Restrict the creation of purchase if no cheque is provided
            raise ValueError("Cheque must be provided when payment method is 'CHEQUE'.")
        super().save_model(request, obj, form, change)

class ChequeAdmin(admin.ModelAdmin):
    list_display = ('cheque_number', 'bank_account', 'status', 'payee', 'issued_date')

    def has_add_permission(self, request):
        # Prevent direct addition of cheques
        return False

admin.site.register(Supplier)
admin.site.register(Purchase, PurchaseAdmin)
admin.site.register(PurchaseItem)
