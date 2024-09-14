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
import { ExpenseType } from "@/lib/types";

export async function getExpenses(): Promise<ExpenseType[]> {
  const response = await fetch("http://127.0.0.1:8000/api/expenses/expenses/", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default function Expenses() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    category: "",
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const {
    data: expenses = [],
    error,
    isLoading,
  } = useQuery<ExpenseType[]>({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const periodMatch =
        !selectedPeriod || expense.date.startsWith(selectedPeriod);
      return (
        periodMatch &&
        (!filters.startDate || expense.date >= filters.startDate) &&
        (!filters.endDate || expense.date <= filters.endDate) &&
        (!filters.minAmount ||
          parseFloat(expense.amount) >= parseFloat(filters.minAmount)) &&
        (!filters.maxAmount ||
          parseFloat(expense.amount) <= parseFloat(filters.maxAmount)) &&
        (!filters.category || expense.category === filters.category)
      );
    });
  }, [selectedPeriod, filters, expenses]);

  const handleBarClick = (period: string) => {
    setSelectedPeriod(period);
  };

  const expensesByCategory = useMemo(() => {
    return filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { total: 0, count: 0 };
      }
      acc[expense.category].total += parseFloat(expense.amount);
      acc[expense.category].count += 1;
      return acc;
    }, {} as { [key: string]: { total: number; count: number } });
  }, [filteredExpenses]);

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
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Expenses</h1>
        <Button size="sm" className="border w-full sm:w-auto">
          New Expense
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="col-span-1 sm:col-span-2 lg:col-span-1"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="mb-8">
            <BarchartComponent
              className="aspect-[16/9] w-full"
              onBarClick={handleBarClick}
            />
          </div>
          {filteredExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="whitespace-nowrap">Amount</TableHead>
                    <TableHead className="whitespace-nowrap">Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense: ExpenseType) => (
                    <TableRow key={expense.id}>
                      <TableCell className="whitespace-nowrap">{expense.date}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{expense.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <div className="bg-muted rounded-lg p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
          <div className="grid gap-4">
            {Object.entries(expensesByCategory).map(
              ([category, { total, count }]) => (
                <div key={category} className="flex justify-between">
                  <div className="font-medium">{category}</div>
                  <div className="text-right">
                    <div className="font-semibold">${total.toFixed(2)}</div>
                    <div className="text-muted-foreground text-sm">
                      {count} items
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}