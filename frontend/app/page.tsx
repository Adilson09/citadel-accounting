"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [view, setView] = useState("This Month");
  const [subView, setSubView] = useState("Day by Day");
  const [customDateRange, setCustomDateRange] = useState({
    start: null,
    end: null,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // Example data for different views
  const dataDayByDay = [
    { day: "1", sales: 20, expenses: 15, profit: 5 },
    { day: "2", sales: 25, expenses: 18, profit: 7 },
    { day: "3", sales: 30, expenses: 20, profit: 10 },
    // ... more data for each day
  ];

  const dataWeekByWeek = [
    { week: "Week 1", sales: 75, expenses: 50, profit: 25 },
    { week: "Week 2", sales: 90, expenses: 60, profit: 30 },
    // ... more data for each week
  ];

  const dataThisMonth =
    subView === "Day by Day" ? dataDayByDay : dataWeekByWeek;

  const dataLastMonth = [
    { month: "July", sales: 150, expenses: 90, profit: 60 },
  ];

  const dataYTD = [
    { month: "January", sales: 186, expenses: 123, profit: 63 },
    { month: "February", sales: 305, expenses: 200, profit: 105 },
    { month: "March", sales: 237, expenses: 150, profit: 87 },
    { month: "April", sales: 73, expenses: 50, profit: 23 },
    { month: "May", sales: 209, expenses: 170, profit: 39 },
    { month: "June", sales: 214, expenses: 180, profit: 34 },
    { month: "July", sales: 150, expenses: 90, profit: 60 },
    { month: "August", sales: 120, expenses: 80, profit: 40 },
  ];

  const dataCustom =
    customDateRange.start && customDateRange.end
      ? dataYTD.filter((item) => {
          const date = new Date(item.month);
          return (
            date >= new Date(customDateRange.start) &&
            date <= new Date(customDateRange.end)
          );
        })
      : [];

  let data;
  if (view === "This Month") {
    data = dataThisMonth;
  } else if (view === "Last Month") {
    data = dataLastMonth;
  } else if (view === "Custom") {
    data = dataCustom;
  } else {
    data = dataYTD;
  }

  const handleCustomDateChange = () => {
    setView("Custom");
    setDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background w-full">
      <main className="flex-1 px-2 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            onClick={() => router.push("/sales/newsale")}
            className="ml-4 py-2 px-4 rounded border"
          >
            New Sale
          </Button>

          <Button
            onClick={() => router.push("/purchases/newpurchase")}
            className="ml-4 py-2 px-4 rounded border"
          >
            New Purchase
          </Button>
          <Button
            onClick={() => router.push("/inventory/newitem")}
            className="ml-4 py-2 px-4 rounded border"
          >
            New Item
          </Button>
        </div>
        <div className="mt-6 rounded-lg border bg-background p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Fast Moving Items</h2>
            <Button
              onClick={() => router.push("/inventory")}
              className="ml-4 py-2 px-4 rounded border text-primary"
            >
              {/* <Link href={inventory} >View All Items</Link> */}
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Item 1</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">100 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Item 2</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">75 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Item 3</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">125 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 rounded-lg border bg-background p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Sales, Expenses, Profits</h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  {view} - {subView}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setView("This Month");
                    setSubView("Day by Day");
                  }}
                >
                  This Month - Day by Day
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setView("This Month");
                    setSubView("Week by Week");
                  }}
                >
                  This Month - Week by Week
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setView("Last Month")}>
                  Last Month
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setView("YTD")}>
                  YTD
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                  Custom Time Period
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 aspect-[16/9]">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={
                    view === "This Month" && subView === "Day by Day"
                      ? "day"
                      : view === "This Month" && subView === "Week by Week"
                      ? "week"
                      : "month"
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="expenses" fill="#82ca9d" />
                <Bar dataKey="profit" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      {/* Custom Time Period Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/*  <DialogTrigger asChild>
           <Button>Open Custom Date Picker</Button>
         </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Time Period</DialogTitle>
            <DialogDescription>
              Select a start and end date for the custom period.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Calendar
              mode="single"
              selected={customDateRange?.start}
              onSelect={(date) =>
                setCustomDateRange((prev) => ({ ...prev, start: date }))
              }
              placeholder="Select start date"
            />
            <Calendar
              mode="single"
              selected={customDateRange?.end}
              onSelect={(date) =>
                setCustomDateRange((prev) => ({ ...prev, end: date }))
              }
              placeholder="Select end date"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCustomDateChange} className="ml-2">
              Apply
            </Button>
            <Button onClick={() => setDialogOpen(false)} className="ml-2">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
