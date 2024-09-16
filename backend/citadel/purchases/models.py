from django.db import models
from inventory.models import Item
from django.utils import timezone

class Supplier(models.Model):
    name = models.CharField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Purchase(models.Model):
    PAYMENT_METHODS = [
        ('CHEQUE', 'Cheque'),
        ('MPESA', 'Mpesa'),
        ('CASH', 'Cash'),
        ('NOT_APPLICABLE', 'Not Applicable'),
    ]

    supplier_name = models.CharField(max_length=100)
    purchase_date = models.DateField(default=timezone.now)
    invoice_number = models.CharField(max_length=100, unique=True)
    sub_total = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0.00)
    tax_subtotal = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0.00)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='NOT_APPLICABLE')
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Calculate the sub_total (without tax) and tax_subtotal
        self.sub_total = sum(item.sub_total for item in self.purchaseitem_set.all())
        self.tax_subtotal = sum(item.tax_amount for item in self.purchaseitem_set.all())

        # Ensure that cheque details are provided when payment method is cheque
        if self.payment_method == 'CHEQUE' and not self.cheque:
            raise ValueError("Cheque must be provided when payment method is 'CHEQUE'.")
        
        super().save(*args, **kwargs)

    def __str__(self):
        return (f"ID: {self.id}, Supplier: {self.supplier_name}, "
                f"Purchase Date: {self.purchase_date}, "
                f"Invoice Number: {self.invoice_number}, "
                f"Sub Total: Kes.{self.sub_total}, Tax: Kes.{self.tax_subtotal}, "
                f"Payment: Kes.{self.payment_amount}, Method: {self.payment_method}")

class PurchaseItem(models.Model):
    TAX_TYPES = [
        ("16% VAT", "16% VAT"),
        ("EXEMPT", "EXEMPT"),
        ("2% CATERING", "2% CATERING LEVY"),
        ("14% VAT", "14% VAT"),
    ]

    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    tax_type = models.CharField(max_length=20, choices=TAX_TYPES, default="EXEMPT")
    purchase_quantity = models.IntegerField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def sub_total(self):
        return self.purchase_quantity * self.purchase_price

    @property
    def tax_amount(self):
        # Calculating tax based on the tax_type chosen
        if self.tax_type == "16% VAT":
            return self.sub_total * 0.16
        elif self.tax_type == "14% VAT":
            return self.sub_total * 0.14
        elif self.tax_type == "2% CATERING":
            return self.sub_total * 0.02
        return 0.00  # EXEMPT or others

    def __str__(self):
        return (f"Purchase: {self.purchase.id}, Item: {self.item.item_name}, "
                f"Quantity: {self.purchase_quantity}, Price: Kes.{self.purchase_price}, "
                f"Sub Total: Kes.{self.sub_total}, Tax: Kes.{self.tax_amount}")
