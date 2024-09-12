from django.urls import path
from .views import (
    BankAccountListCreateView, BankAccountDetailView,
    MpesaAccountListCreateView, MpesaAccountDetailView,
    ChequeListCreateView, ChequeDetailView,
    TransactionListCreateView, TransactionDetailView,
    TransferListCreateView, TransferDetailView
)

urlpatterns = [
    # Bank Account URLs
    path('bank-accounts/', BankAccountListCreateView.as_view(), name='bankaccount-list-create'),
    path('bank-accounts/<int:pk>/', BankAccountDetailView.as_view(), name='bankaccount-detail'),

    # Mpesa Account URLs
    path('mpesa-accounts/', MpesaAccountListCreateView.as_view(), name='mpesaaccount-list-create'),
    path('mpesa-accounts/<int:pk>/', MpesaAccountDetailView.as_view(), name='mpesaaccount-detail'),

    # Cheque URLs
    path('cheques/', ChequeListCreateView.as_view(), name='cheque-list-create'),
    path('cheques/<int:pk>/', ChequeDetailView.as_view(), name='cheque-detail'),

    # Transaction URLs
    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', TransactionDetailView.as_view(), name='transaction-detail'),

    # Transfer URLs
    path('transfers/', TransferListCreateView.as_view(), name='transfer-list-create'),
    path('transfers/<int:pk>/', TransferDetailView.as_view(), name='transfer-detail'),
]
