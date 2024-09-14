"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SaleType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DollarSignIcon, CreditCardIcon } from "@/components/ui/icons"; // Import your icons

export async function getSales(): Promise<SaleType[]> {
  const response = await fetch("http://127.0.0.1:8000/api/sales/sales", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default function Sales() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const {
    data: sales = [],
    error,
    isLoading,
  } = useQuery<SaleType[]>({
    queryKey: ["sales"],
    queryFn: getSales,
  });

  const router = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const periodMatch =
        !selectedPeriod || sale.sale_date.startsWith(selectedPeriod);
      return (
        periodMatch &&
        (!filters.startDate || sale.sale_date >= filters.startDate) &&
        (!filters.endDate || sale.sale_date <= filters.endDate) &&
        (!filters.minAmount ||
          parseFloat(sale.sub_total) >= parseFloat(filters.minAmount)) &&
        (!filters.maxAmount ||
          parseFloat(sale.sub_total) <= parseFloat(filters.maxAmount))
      );
    });
  }, [selectedPeriod, filters, sales]);

  const handleBarClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const salesByDate = useMemo(() => {
    return filteredSales.reduce((acc, sale) => {
      if (!acc[sale.sale_date]) {
        acc[sale.sale_date] = { total: 0, count: 0 };
      }
      acc[sale.sale_date].total += parseFloat(sale.sub_total);
      acc[sale.sale_date].count += 1;
      return acc;
    }, {} as { [key: string]: { total: number; count: number } });
  }, [filteredSales]);

  if (isLoading) {
    return <p>Loading resource...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading resource:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-4 bg-muted">
          <div className="container mx-auto grid gap-4 px-4 md:px-6 lg:grid-cols-3 lg:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSignIcon className="w-6 h-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCardIcon className="w-6 h-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <DollarSignIcon className="w-6 h-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$23,456.78</div>
                <p className="text-xs text-muted-foreground">
                  +15.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="w-full md:py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6 flex items-center justify-between flex-wrap">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
                <Input
                  type="date"
                  name="endDate"
                  placeholder="End Date"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
                <Input
                  type="number"
                  name="minAmount"
                  placeholder="Min Amount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                />
                <Input
                  type="number"
                  name="maxAmount"
                  placeholder="Max Amount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                />
              </div>
              <Button
                onClick={() => router.push("/sales/newsale")}
                className="mt-4 md:mt-0 ml-4 text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600"
              >
                New Sale
              </Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length > 0 ? (
                    filteredSales.map((sale: SaleType) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.sale_date}</TableCell>
                        <TableCell>Customer here</TableCell>
                        <TableCell className="text-right">
                          ${parseFloat(sale.sub_total).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              sale.paid
                                ? "bg-green-700 text-green-200" // Paid
                                : "bg-red-700 text-red-200" // Unpaid
                            }
                          >
                            {sale.paid ? "Paid" : "Unpaid"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No sales
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
