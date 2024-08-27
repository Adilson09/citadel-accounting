from django import forms
from .models import Sale, SaleItem

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = ['customer', 'sale_date', 'tax_type']

class SaleItemForm(forms.ModelForm):
    class Meta:
        model = SaleItem
        fields = ['item', 'sale_quantity', 'selling_price']

SaleItemFormSet = forms.inlineformset_factory(
    Sale, SaleItem, form=SaleItemForm, extra=1, can_delete=True
)