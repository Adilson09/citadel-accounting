from django.contrib import admin
from .models import BankAccount, Cheque, Transaction, Transfer, MpesaAccount

# Custom admin for BankAccount model
class BankAccountAdmin(admin.ModelAdmin):
    list_display = (
        'account_name', 
        'account_number', 
        'account_type', 
        'balance', 
        'cheque_book_issued', 
        'cheque_leaves_remaining', 
        'currency', 
        'bank', 
        'created_at'
    )
    list_filter = ('account_type', 'cheque_book_issued', 'currency', 'bank')  # Filters for easier navigation
    search_fields = ('account_name', 'account_number')  # Search by account name or number

# Custom admin for Cheque model
class ChequeAdmin(admin.ModelAdmin):
    list_display = (
        'cheque_number', 
        'bank_account', 
        'issued_date', 
        'status'
    )
    list_filter = ('status',)  # Filter by cheque status
    search_fields = ('cheque_number', 'bank_account__account_name')  # Search by cheque number or account name

# Custom admin for Transaction model
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        'transaction_type', 
        'bank_account', 
        'mpesa_account', 
        'amount', 
        'timestamp'
    )
    list_filter = ('transaction_type', 'timestamp')  # Filter by transaction type and date
    search_fields = ('bank_account__account_name', 'mpesa_account__account_name')  # Search by account names

# Custom admin for Transfer model
class TransferAdmin(admin.ModelAdmin):
    list_display = (
        'transfer_type', 
        'sender_account', 
        'recipient_account', 
        'amount', 
        'timestamp'
    )
    list_filter = ('transfer_type', 'transfer_destination')  # Filter by transfer type and destination
    search_fields = ('sender_account__account_name', 'recipient_account__account_name')  # Search by sender and recipient

# Custom admin for MpesaAccount model
class MpesaAccountAdmin(admin.ModelAdmin):
    list_display = (
        'account_name', 
        'mpesa_number', 
        'account_type', 
        'balance', 
        'created_at'
    )
    list_filter = ('account_type',)  # Filter by account type
    search_fields = ('account_name', 'mpesa_number')  # Search by account name or Mpesa number

# Register models with custom admin configurations
admin.site.register(BankAccount, BankAccountAdmin)
admin.site.register(Cheque, ChequeAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Transfer, TransferAdmin)
admin.site.register(MpesaAccount, MpesaAccountAdmin)
