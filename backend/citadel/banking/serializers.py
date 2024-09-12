from rest_framework import serializers
from .models import BankAccount, MpesaAccount, Cheque, Transaction, Transfer

# Serializer for BankAccount
class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'

# Serializer for MpesaAccount
class MpesaAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaAccount
        fields = '__all__'

# Serializer for Cheque
class ChequeSerializer(serializers.ModelSerializer):
    bank_account = serializers.StringRelatedField()  # To show a friendly representation of the bank account

    class Meta:
        model = Cheque
        fields = '__all__'

# Serializer for Transaction
class TransactionSerializer(serializers.ModelSerializer):
    bank_account = serializers.StringRelatedField()  # Friendly bank account representation
    mpesa_account = serializers.StringRelatedField()  # Friendly Mpesa account representation

    class Meta:
        model = Transaction
        fields = '__all__'

# Serializer for Transfer
class TransferSerializer(serializers.ModelSerializer):
    sender_account = serializers.StringRelatedField()  # Friendly sender account representation
    recipient_account = serializers.StringRelatedField()  # Friendly recipient account representation

    class Meta:
        model = Transfer
        fields = '__all__'
