// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { format } from "date-fns";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Textarea } from "@/components/ui/textarea";
// import { X } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// // API function to save the sale
// const saveSale = async (saleData) => {
//   const response = await fetch("http://127.0.0.1:8000/api/sales", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(saleData),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to save sale");
//   }
//   return response.json();
// };

// export default function NewSale() {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [saleData, setSaleData] = useState({
//     customerName: "",
//     saleDate: new Date(),
//     itemDescription: "",
//     quantity: 0,
//     pricePerUnit: 0,
//     totalAmount: 0,
//     notes: "",
//   });

//   const saveMutation = useMutation({
//     mutationFn: saveSale,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["sales"] });
//       router.push("/sales");
//     },
//   });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setSaleData((prev) => ({ ...prev, [id]: value }));

//     // Recalculate total amount when quantity or price changes
//     if (id === "quantity" || id === "pricePerUnit") {
//       const quantity =
//         id === "quantity" ? parseFloat(value) : saleData.quantity;
//       const pricePerUnit =
//         id === "pricePerUnit" ? parseFloat(value) : saleData.pricePerUnit;
//       const totalAmount = quantity * pricePerUnit;
//       setSaleData((prev) => ({ ...prev, totalAmount }));
//     }
//   };

//   const handleDateChange = (date) => {
//     setSaleData((prev) => ({ ...prev, saleDate: date }));
//   };

//   const handleCancel = () => {
//     setDialogOpen(true);
//   };

//   const confirmCancel = () => {
//     setDialogOpen(false);
//     router.back();
//   };

//   const closeDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleSave = (event) => {
//     event.preventDefault();
//     saveMutation.mutate(saleData);
//   };

//   return (
//     <>
//       <Card className="px-8 mt-4 w-full max-w-2xl">
//         <CardHeader className="relative">
//           <CardTitle>New Sale</CardTitle>
//           <Button
//             variant="outline"
//             className="absolute top-2 right-2"
//             onClick={() => router.back()}
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         </CardHeader>
//         <CardContent className="grid gap-2">
//           <form onSubmit={handleSave} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="customerName">Customer Name</Label>
//                 <Input
//                   id="customerName"
//                   value={saleData.customerName}
//                   onChange={handleInputChange}
//                   placeholder="Enter customer name"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="saleDate">Sale Date</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start font-normal"
//                     >
//                       {format(saleData.saleDate, "PPP")}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={saleData.saleDate}
//                       onSelect={handleDateChange}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="itemDescription">Item Description</Label>
//               <Input
//                 id="itemDescription"
//                 value={saleData.itemDescription}
//                 onChange={handleInputChange}
//                 placeholder="Enter item description"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="quantity">Quantity</Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   value={saleData.quantity}
//                   onChange={handleInputChange}
//                   placeholder="0"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="pricePerUnit">Price per Unit</Label>
//                 <Input
//                   id="pricePerUnit"
//                   type="number"
//                   value={saleData.pricePerUnit}
//                   onChange={handleInputChange}
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="totalAmount">Total Amount</Label>
//               <Input
//                 id="totalAmount"
//                 type="number"
//                 value={saleData.totalAmount.toFixed(2)}
//                 readOnly
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes</Label>
//               <Textarea
//                 id="notes"
//                 value={saleData.notes}
//                 onChange={handleInputChange}
//                 placeholder="Enter any additional notes"
//                 rows={2}
//               />
//             </div>
//             <CardFooter className="flex justify-end gap-4">
//               <Button type="button" variant="outline" onClick={handleCancel}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={saveMutation.isPending}>
//                 {saveMutation.isPending ? "Saving..." : "Save"}
//               </Button>
//             </CardFooter>
//           </form>
//         </CardContent>
//       </Card>

//       <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
//           </AlertDialogHeader>
//           <AlertDialogDescription>
//             Are you sure you want to cancel this sale? Any unsaved changes will
//             be lost.
//           </AlertDialogDescription>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={closeDialog}>
//               No, Go Back
//             </AlertDialogCancel>
//             <AlertDialogAction onClick={confirmCancel}>
//               Yes, Cancel
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

// ("use client");

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Plus, Minus, ShoppingCart } from "lucide-react";

// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// }

// export default function Component() {
//   const [items, setItems] = useState<Item[]>([
//     { id: 1, name: "", quantity: 1, price: 0 },
//   ]);

//   const addRow = () => {
//     const newId =
//       items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
//     setItems([...items, { id: newId, name: "", quantity: 1, price: 0 }]);
//   };

//   const removeRow = (id: number) => {
//     if (items.length > 1) {
//       setItems(items.filter((item) => item.id !== id));
//     }
//   };

//   const updateItem = (
//     id: number,
//     field: keyof Item,
//     value: string | number
//   ) => {
//     setItems(
//       items.map((item) =>
//         item.id === id
//           ? { ...item, [field]: field === "name" ? value : Number(value) }
//           : item
//       )
//     );
//   };

//   const total = items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Sales Page</h1>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Item Name</TableHead>
//             <TableHead>Quantity</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Subtotal</TableHead>
//             <TableHead></TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {items.map((item) => (
//             <TableRow key={item.id}>
//               <TableCell>
//                 <Input
//                   value={item.name}
//                   onChange={(e) => updateItem(item.id, "name", e.target.value)}
//                   placeholder="Enter item name"
//                 />
//               </TableCell>
//               <TableCell>
//                 <Input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateItem(item.id, "quantity", e.target.value)
//                   }
//                   min={1}
//                 />
//               </TableCell>
//               <TableCell>
//                 <Input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => updateItem(item.id, "price", e.target.value)}
//                   min={0}
//                   step={0.01}
//                 />
//               </TableCell>
//               <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => removeRow(item.id)}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="mt-4 flex justify-between items-center">
//         <Button onClick={addRow}>
//           <Plus className="h-4 w-4 mr-2" /> Add Item
//         </Button>
//         <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
//       </div>
//       <div className="mt-4">
//         <Button className="w-full">
//           <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
//         </Button>
//       </div>
//     </div>
//   );
// }

// "use client"
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { format } from "date-fns";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Textarea } from "@/components/ui/textarea";
// import { X, Plus, Minus, ShoppingCart } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // API function to save the sale
// const saveSale = async (saleData) => {
//   const response = await fetch("http://127.0.0.1:8000/api/sales", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(saleData),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to save sale");
//   }
//   return response.json();
// };

// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// }

// export default function CombinedSalesPage() {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [saleData, setSaleData] = useState({
//     customerName: "",
//     saleDate: new Date(),
//     notes: "",
//     items: [{ id: 1, name: "", quantity: 1, price: 0 }] as Item[],
//   });

//   const saveMutation = useMutation({
//     mutationFn: saveSale,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["sales"] });
//       router.push("/sales");
//     },
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { id, value } = e.target;
//     setSaleData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleDateChange = (date: Date) => {
//     setSaleData((prev) => ({ ...prev, saleDate: date }));
//   };

//   const handleCancel = () => {
//     setDialogOpen(true);
//   };

//   const confirmCancel = () => {
//     setDialogOpen(false);
//     router.back();
//   };

//   const closeDialog = () => {
//     setDialogOpen(false);
//   };

//   const handleSave = (event: React.FormEvent) => {
//     event.preventDefault();
//     saveMutation.mutate(saleData);
//   };

//   const addRow = () => {
//     const newId =
//       saleData.items.length > 0
//         ? Math.max(...saleData.items.map((item) => item.id)) + 1
//         : 1;
//     setSaleData((prev) => ({
//       ...prev,
//       items: [...prev.items, { id: newId, name: "", quantity: 1, price: 0 }],
//     }));
//   };

//   const removeRow = (id: number) => {
//     if (saleData.items.length > 1) {
//       setSaleData((prev) => ({
//         ...prev,
//         items: prev.items.filter((item) => item.id !== id),
//       }));
//     }
//   };

//   const updateItem = (
//     id: number,
//     field: keyof Item,
//     value: string | number
//   ) => {
//     setSaleData((prev) => ({
//       ...prev,
//       items: prev.items.map((item) =>
//         item.id === id
//           ? { ...item, [field]: field === "name" ? value : Number(value) }
//           : item
//       ),
//     }));
//   };

//   const total = saleData.items.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   return (
//     <Card className="container mx-auto p-4 mt-4 w-full max-w-4xl">
//       <CardHeader className="relative">
//         <CardTitle>New Sale</CardTitle>
//         <Button
//           variant="outline"
//           className="absolute top-2 right-2"
//           onClick={() => router.back()}
//         >
//           <X className="w-4 h-4" />
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSave} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="customerName">Customer Name</Label>
//               <Input
//                 id="customerName"
//                 value={saleData.customerName}
//                 onChange={handleInputChange}
//                 placeholder="Enter customer name"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="saleDate">Sale Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start font-normal"
//                   >
//                     {format(saleData.saleDate, "PPP")}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={saleData.saleDate}
//                     onSelect={handleDateChange}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Item Name</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Subtotal</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {saleData.items.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <Input
//                       value={item.name}
//                       onChange={(e) =>
//                         updateItem(item.id, "name", e.target.value)
//                       }
//                       placeholder="Enter item name"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateItem(item.id, "quantity", e.target.value)
//                       }
//                       min={1}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Input
//                       type="number"
//                       value={item.price}
//                       onChange={(e) =>
//                         updateItem(item.id, "price", e.target.value)
//                       }
//                       min={0}
//                       step={0.01}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     ${(item.quantity * item.price).toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeRow(item.id)}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <div className="mt-4 flex justify-between items-center">
//             <Button type="button" onClick={addRow}>
//               <Plus className="h-4 w-4 mr-2" /> Add Item
//             </Button>
//             <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="notes">Notes</Label>
//             <Textarea
//               id="notes"
//               value={saleData.notes}
//               onChange={handleInputChange}
//               placeholder="Enter any additional notes"
//               rows={2}
//             />
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={handleCancel}>
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           onClick={handleSave}
//           disabled={saveMutation.isPending}
//         >
//           {saveMutation.isPending ? "Saving..." : "Save"}
//         </Button>
//       </CardFooter>

//       <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
//           </AlertDialogHeader>
//           <AlertDialogDescription>
//             Are you sure you want to cancel this sale? Any unsaved changes will
//             be lost.
//           </AlertDialogDescription>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={closeDialog}>
//               No, Go Back
//             </AlertDialogCancel>
//             <AlertDialogAction onClick={confirmCancel}>
//               Yes, Cancel
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </Card>
//   );
// }

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
        <AlertDialogContent>
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
