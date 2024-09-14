from django.contrib import admin
from .models import ExpenseCategory, Expense

# Customizing the admin interface for ExpenseCategory
class ExpenseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Specify fields to display in table format

# Customizing the admin interface for Expense
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('category', 'amount', 'date', 'payee', 'created_at')  # Specify fields to display
    list_filter = ('category', 'date')  # Optional: Adds filters on the right
    search_fields = ('category__name', 'description', 'payee')  # Optional: Adds a search bar

# Registering the models with their respective ModelAdmin classes
admin.site.register(ExpenseCategory, ExpenseCategoryAdmin)
admin.site.register(Expense, ExpenseAdmin)
