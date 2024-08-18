"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
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

export default function Payments() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "date", order: "desc" });
  const payments = [
    {
      id: 1,
      amount: 1500.0,
      date: "2023-06-01",
      method: "card",
    },
    {
      id: 2,
      amount: 500.0,
      date: "2023-05-15",
      method: "cash",
    },
    {
      id: 3,
      amount: 2000.0,
      date: "2023-04-30",
      method: "transfer",
    },
    {
      id: 4,
      amount: 750.0,
      date: "2023-04-20",
      method: "cheque",
    },
    {
      id: 5,
      amount: 1200.0,
      date: "2023-03-25",
      method: "card",
    },
    {
      id: 6,
      amount: 300.0,
      date: "2023-03-10",
      method: "cash",
    },
    {
      id: 7,
      amount: 1800.0,
      date: "2023-02-28",
      method: "transfer",
    },
    {
      id: 8,
      amount: 400.0,
      date: "2023-02-15",
      method: "cheque",
    },
  ];
  const filteredPayments = useMemo(() => {
    return payments
      .filter(
        (payment) =>
          payment.amount.toString().includes(search) ||
          payment.date.includes(search) ||
          payment.method.includes(search)
      )
      .sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1;
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1;
        }
      });
  }, [search, sort]);
  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ key, order: "asc" });
    }
  };
  const getPaymentBadgeColor = (method) => {
    switch (method) {
      case "cash":
        return "bg-green-500 text-white";
      case "card":
        return "bg-blue-500 text-white";
      case "transfer":
        return "bg-purple-500 text-white";
      case "cheque":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mr-4 w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <ListOrderedIcon className="mr-2 h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup
                value={sort.key}
                onValueChange={(key) => handleSort(key)}
              >
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="amount">
                  Amount
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="method">
                  Payment Method
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date
                {sort.key === "date" && (
                  <span className="ml-2">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount
                {sort.key === "amount" && (
                  <span className="ml-2">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("method")}
              >
                Payment Method
                {sort.key === "method" && (
                  <span className="ml-2">
                    {sort.order === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getPaymentBadgeColor(payment.method)}>
                    {payment.method}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}
