from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/invoicing/', include('invoicing.urls')),
    path('api/purchases/', include('purchases.urls')),
    path('api/sales/', include('sales.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/expenses/', include('expenses.urls')),
    path('api/banking/', include('banking.urls')),
    path('api/payroll/', include('payroll.urls')),
    path('api/files/', include('filemanagement.urls')),
    
]