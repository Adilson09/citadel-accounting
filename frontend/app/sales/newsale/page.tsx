"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Minus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// API function to save the sale
const saveSale = async (saleData) => {
  const response = await fetch("http://127.0.0.1:8000/api/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    throw new Error("Failed to save sale");
  }
  return response.json();
};

interface Item {
  id: number;
  description: string;
  quantity: number;
  pricePerUnit: number;
}

export default function NewSale() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [saleData, setSaleData] = useState({
    customerName: "",
    saleDate: new Date(),
    items: [{ id: 1, description: "", quantity: 1, pricePerUnit: 0 }] as Item[],
    notes: "",
  });

  const saveMutation = useMutation({
    mutationFn: saveSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      router.push("/sales");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setSaleData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date) => {
    setSaleData((prev) => ({ ...prev, saleDate: date }));
  };

  const handleCancel = () => {
    setDialogOpen(true);
  };

  const confirmCancel = () => {
    setDialogOpen(false);
    router.back();
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    saveMutation.mutate(saleData);
  };

  const addRow = () => {
    const newId =
      saleData.items.length > 0
        ? Math.max(...saleData.items.map((item) => item.id)) + 1
        : 1;
    setSaleData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: newId, description: "", quantity: 1, pricePerUnit: 0 },
      ],
    }));
  };

  const removeRow = (id: number) => {
    if (saleData.items.length > 1) {
      setSaleData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const updateItem = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    setSaleData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "description" ? value : Number(value),
            }
          : item
      ),
    }));
  };

  const totalAmount = saleData.items.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );

  return (
    <Card className="px-8 mt-4 w-full max-w-4xl mx-auto">
      <CardHeader className="relative">
        <CardTitle>New Sale</CardTitle>
        <Button
          variant="outline"
          className="absolute top-2 right-2"
          onClick={() => router.back()}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={saleData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saleDate">Sale Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    {format(saleData.saleDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={saleData.saleDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price per Unit</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {saleData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Enter item description"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", e.target.value)
                      }
                      min={1}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.pricePerUnit}
                      onChange={(e) =>
                        updateItem(item.id, "pricePerUnit", e.target.value)
                      }
                      min={0}
                      step={0.01}
                    />
                  </TableCell>
                  <TableCell>
                    ${(item.quantity * item.pricePerUnit).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-between items-center">
            <Button type="button" onClick={addRow}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
            <div className="text-xl font-bold">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={saleData.notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              rows={2}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </CardFooter>

      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure you want to cancel this sale? Any unsaved changes will
            be lost.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>
              No, Go Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
