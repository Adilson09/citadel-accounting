"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { InvoiceType } from "@/lib/types";

async function getInvoices(): Promise<InvoiceType[]> {
  const response = await fetch(
    "http://127.0.0.1:8000/api/invoicing/invoices/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}

export default function Invoicing() {
  const {
    data: invoices = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  if (isLoading) {
    return <p className="text-center p-4">Loading invoices...</p>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading invoices:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
      {invoices.length === 0 ? (
        <p className="text-center">No invoices found.</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-bold">Invoices</h1>
            <Button size="sm" className="border w-full sm:w-auto">
              New Invoice
            </Button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice: InvoiceType) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoice_number}
                        <span className="block sm:hidden text-sm text-gray-500">
                          {invoice.customer.first_name} - {new Date(invoice.date).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{invoice.customer.first_name}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(invoice.due_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        ${parseFloat(invoice.total_amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            invoice.paid
                              ? "bg-green-700 text-green-200" // Paid
                              : "bg-red-700 text-red-200" // Not Paid
                          }
                        >
                          {invoice.paid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}