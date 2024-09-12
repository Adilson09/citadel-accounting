from rest_framework import generics
from .models import BankAccount, MpesaAccount, Cheque, Transaction, Transfer
from .serializers import BankAccountSerializer, MpesaAccountSerializer, ChequeSerializer, TransactionSerializer, TransferSerializer

# Bank Account Views
class BankAccountListCreateView(generics.ListCreateAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

class BankAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

# M-Pesa Account Views
class MpesaAccountListCreateView(generics.ListCreateAPIView):
    queryset = MpesaAccount.objects.all()
    serializer_class = MpesaAccountSerializer

class MpesaAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MpesaAccount.objects.all()
    serializer_class = MpesaAccountSerializer

# Cheque Views
class ChequeListCreateView(generics.ListCreateAPIView):
    queryset = Cheque.objects.all()
    serializer_class = ChequeSerializer

class ChequeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cheque.objects.all()
    serializer_class = ChequeSerializer

# Transaction Views
class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

# Transfer Views
class TransferListCreateView(generics.ListCreateAPIView):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer

class TransferDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer
