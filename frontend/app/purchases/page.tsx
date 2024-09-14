"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import BarchartComponent from "@/components/BarchartComponent";
import { PurchaseType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export async function getPurchases(): Promise<PurchaseType[]> {
  const response = await fetch(
    "http://127.0.0.1:8000/api/purchases/purchases/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default function Purchases() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    supplier: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const {
    data: purchases = [],
    error,
    isLoading,
  } = useQuery<PurchaseType[]>({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  const router = useRouter(); // Use the useRouter hook

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const periodMatch =
        !selectedPeriod || purchase.purchase_date.startsWith(selectedPeriod);
      return (
        periodMatch &&
        (!filters.startDate || purchase.purchase_date >= filters.startDate) &&
        (!filters.endDate || purchase.purchase_date <= filters.endDate) &&
        (!filters.minAmount ||
          parseFloat(purchase.sub_total) >= parseFloat(filters.minAmount)) &&
        (!filters.maxAmount ||
          parseFloat(purchase.sub_total) <= parseFloat(filters.maxAmount)) &&
        (!filters.supplier || purchase.supplier_name === filters.supplier)
      );
    });
  }, [selectedPeriod, filters, purchases]);

  const handleBarClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const purchasesBySupplier = useMemo(() => {
    return filteredPurchases.reduce((acc, purchase) => {
      if (!acc[purchase.supplier_name]) {
        acc[purchase.supplier_name] = { total: 0, count: 0 };
      }
      acc[purchase.supplier_name].total += parseFloat(purchase.sub_total);
      acc[purchase.supplier_name].count += 1;
      return acc;
    }, {} as { [key: string]: { total: number; count: number } });
  }, [filteredPurchases]);

  if (isLoading) {
    return <p>Loading resource...</p>;
  }

  if (error) {
    return (
      <div>
        Error loading resource:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => router.push("/purchases/newpurchase")}
                  className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600"
                >
                  New Purchase
                </Button>
              </div>
              <div className="space-y-4">
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
                <Select
                  name="supplier"
                  value={filters.supplier}
                  onChange={handleFilterChange}
                >
                  <option value="">All Suppliers</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Services">Services</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-24 bg-gray-100">
          <div className="container mx-auto grid gap-4 px-4 md:px-6 lg:grid-cols-3 lg:gap-6">
            <Card className="bg-white shadow-md">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Purchases
                </CardTitle>
                <DollarSignIcon className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {filteredPurchases
                    .reduce(
                      (acc, purchase) => acc + parseFloat(purchase.sub_total),
                      0
                    )
                    .toFixed(2)}
                </div>
                <p className="text-xs text-gray-500">
                  Total amount of filtered purchases
                </p>
              </CardContent>
            </Card>
            {/* Additional Cards can be added here for other summaries */}
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="bg-white shadow-md">
              <div className="mb-8">
                <BarchartComponent
                  className="w-full h-64 md:h-80 lg:h-96"
                  onBarClick={handleBarClick}
                />
              </div>
              {filteredPurchases.length === 0 ? (
                <p>No purchases found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Supplier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPurchases.map((purchase) => (
                        <TableRow
                          key={purchase.id}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          <TableCell>
                            <Link href={`/purchases/${purchase.id}`}>
                              {purchase.purchase_date}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/purchases/${purchase.id}`}>
                              ${parseFloat(purchase.sub_total).toFixed(2)}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/purchases/${purchase.id}`}>
                              {purchase.supplier_name}
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
