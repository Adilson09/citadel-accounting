from django.db import models
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError

class BankAccount(models.Model):
    ACCOUNT_TYPES = [
        ('PERSONAL', 'Personal'),
        ('CURRENT', 'Current'),
    ]

    CURRENCIES = [
        ('KES', 'KES'),
        ('USD', 'USD'),
        ('EUR', 'Euro'),
        ('GBP', 'GBP'),
    ]

    BANKS = [
        ('KCB', 'Kenya Commercial Bank'),
        ('NCBA', 'NCBA Bank'),
        ('EQUITY', 'Equity Bank'),
        ('ABSA', 'ABSA Bank'),
        ('COOP', 'Co-operative Bank'),
        ('I&M', 'I&M Bank'),
        ('SIDIAN', 'SIDIAN Bank'),
        ('FAMILY', 'FAMILY Bank'),
        ('HFC', 'HFC Bank'),
        ('STANCHART', 'STANCHART Bank'),
    ]

    account_name = models.CharField(max_length=50)
    account_number = models.CharField(max_length=50, unique=True)
    account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPES)
    balance = models.DecimalField(max_digits=15, decimal_places=2)
    cheque_book_issued = models.BooleanField(default=False)
    cheque_leaves_remaining = models.PositiveIntegerField(default=0, blank=True, null=True)
    currency = models.CharField(max_length=3, choices=CURRENCIES, default='KES')
    bank = models.CharField(max_length=10, choices=BANKS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account_name} - {self.account_number} ({self.get_currency_display()} at {self.get_bank_display()})"

    def clean(self):
        if self.cheque_book_issued and (self.cheque_leaves_remaining is None or self.cheque_leaves_remaining <= 0):
            raise ValidationError("You must specify the number of cheque leaves remaining if a cheque book is issued.")
        if not self.cheque_book_issued:
            self.cheque_leaves_remaining = 0

    def issue_cheque_book(self, size):
        if self.account_type == 'CURRENT':
            if not self.cheque_book_issued or self.cheque_leaves_remaining == 0:
                self.cheque_book_issued = True
                self.cheque_leaves_remaining = size
                self.save()
            else:
                raise ValueError("A cheque book is already active.")
        else:
            raise ValueError("Cheque books can only be issued for current accounts.")

    def use_cheque_leaf(self):
        if self.cheque_leaves_remaining > 0:
            self.cheque_leaves_remaining -= 1
            self.save()
        else:
            raise ValueError("No more cheque leaves available. Please issue a new cheque book.")

class Cheque(models.Model):
    CHEQUE_STATUSES = [
        ('PENDING', 'Pending'),
        ('CLEARED', 'Cleared'),
        ('BOUNCED', 'Bounced'),
        ('CANCELLED', 'Cancelled'),
        ('STALE', 'Stale'),
    ]

    bank_account = models.ForeignKey(
        BankAccount, 
        on_delete=models.CASCADE, 
        related_name="cheques"
    )
    cheque_number = models.CharField(max_length=20, unique=True)
    issued_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=CHEQUE_STATUSES, default='PENDING')
    purchase = models.OneToOneField(
        'purchases.Purchase', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='cheque'  # This should be unique and not conflict with other fields
    )

    def __str__(self):
        return f"Cheque {self.cheque_number} for {self.bank_account.account_name}"

    def update_status(self, new_status):
        if new_status not in dict(self.CHEQUE_STATUSES).keys():
            raise ValueError("Invalid status.")

        if self.status == 'PENDING' and new_status in ['CLEARED', 'BOUNCED', 'CANCELLED', 'STALE']:
            self.status = new_status
            self.save()

    def cash_cheque(self):
        if self.status == 'PENDING':
            self.status = 'CLEARED'
            self.save()
        else:
            raise ValueError("This cheque cannot be cashed.")

    def is_stale(self):
        six_months_ago = datetime.now() - timedelta(days=180)
        return self.issued_date < six_months_ago and self.status == 'PENDING'


class MpesaAccount(models.Model):
    MPESA_ACCOUNT_TYPES = [
        ('PERSONAL', 'Personal Phone Number'),
        ('TILL', 'Mpesa Till'),
    ]

    account_name = models.CharField(max_length=50)
    mpesa_number = models.CharField(max_length=20, unique=True)
    account_type = models.CharField(max_length=10, choices=MPESA_ACCOUNT_TYPES)
    balance = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.account_name} - {self.mpesa_number}"

    def credit(self, amount):
        self.balance += amount
        self.save()

    def debit(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.save()
        else:
            raise ValueError("Insufficient funds.")


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('CREDIT', 'Credit'),
        ('DEBIT', 'Debit'),
    ]

    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, null=True, blank=True)
    mpesa_account = models.ForeignKey(MpesaAccount, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.bank_account:
            if self.transaction_type == 'CREDIT':
                self.bank_account.deposit(self.amount)
            elif self.transaction_type == 'DEBIT':
                self.bank_account.withdraw(self.amount)

        if self.mpesa_account:
            if self.transaction_type == 'CREDIT':
                self.mpesa_account.credit(self.amount)
            elif self.transaction_type == 'DEBIT':
                self.mpesa_account.debit(self.amount)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} on {self.timestamp}"


class Transfer(models.Model):
    TRANSFER_TYPES = [
        ('EFT', 'Electronic Funds Transfer'),
        ('RTGS', 'Real Time Gross Settlement'),
    ]

    TRANSFER_DESTINATIONS = [
        ('INTRABANK', 'Within Same Bank'),
        ('INTERBANK', 'To Other Bank'),
    ]

    sender_account = models.ForeignKey(BankAccount, related_name='outgoing_transfers', on_delete=models.CASCADE)
    recipient_account = models.ForeignKey(BankAccount, related_name='incoming_transfers', on_delete=models.CASCADE)
    transfer_type = models.CharField(max_length=4, choices=TRANSFER_TYPES)
    transfer_destination = models.CharField(max_length=11, choices=TRANSFER_DESTINATIONS)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.transfer_type} of {self.amount} from {self.sender_account} to {self.recipient_account} on {self.timestamp}"
