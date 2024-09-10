from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(BankAccount)
admin.site.register(Cheque)
admin.site.register(Transaction)
admin.site.register(Transfer)
admin.site.register(MpesaAccount)
