from django.db import models

# Create your models here.
class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    category = models.ForeignKey(ExpenseCategory, on_delete=models.CASCADE)  # Use ForeignKey here
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    payee = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Access category.name from the ForeignKey relationship
        return f"{self.amount} on {self.date} for {self.category.name}"
