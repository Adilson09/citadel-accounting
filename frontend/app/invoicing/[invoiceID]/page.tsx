// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import { useQuery } from "@tanstack/react-query";
// //import { getInvoiceById } from "@/server/actions";
// import { InvoiceType } from "@/lib/types";
// import { useParams, useRouter } from "next/navigation";

// async function getInvoiceById(id: string): Promise<InvoiceType> {
//   const response = await fetch(
//     `http://127.0.0.1:8000/api/invoicing/invoices/${id}/`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch invoice");
//   }

//   return response.json();
// }

// // Component to display details of a single invoice
// export default function Invoice() {
//   const { id } = useParams(); // Use useParams to get the dynamic route parameter
//   const router = useRouter();

//   // Fetching invoice data using TanStack Query
//   const {
//     data: invoice,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["invoice", id],
//     queryFn: () => getInvoiceById(id as string),
//     enabled: !!id, // Fetch only when `id` is available
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error)
//     return (
//       <p>
//         Error loading invoice:{" "}
//         {error instanceof Error ? error.message : "Unknown error"}
//       </p>
//     );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
//       <div className="relative w-full max-w-3xl rounded-lg bg-background shadow-2xl">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute top-4 right-4 rounded-full"
//           onClick={() => router.back()}
//         >
//           <XIcon className="h-5 w-5" />
//           <span className="sr-only">Close</span>
//         </Button>
//         <div className="grid gap-8 p-8 md:p-12">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Image
//                 src="/placeholder.svg"
//                 alt="Company Logo"
//                 width={48}
//                 height={48}
//                 className="rounded-md"
//               />
//               <div className="grid gap-1">
//                 <h2 className="text-2xl font-bold">
//                   {/* {invoice?.customer?.name} */}
//                   Customer Fulani
//                 </h2>
//                 <p className="text-sm text-muted-foreground">
//                   {/* Assuming customer address or other details */}
//                   {/* {invoice?.customer?.address} */}
//                   90210, Nairobi
//                 </p>
//               </div>
//             </div>
//             <div className="grid gap-1 text-right">
//               <p className="text-sm font-medium">
//                 Invoice #{invoice?.invoice_number}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Issued: 01/08/2024
//                 {/* Issued: {new Date(invoice?.date).toLocaleDateString()} */}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 {/* Due: {new Date(invoice?.due_date).toLocaleDateString()} */}
//                 Due: 10/08/2024
//               </p>
//             </div>
//           </div>
//           <div className="grid gap-6">
//             <div className="grid gap-1">
//               <p className="text-sm font-medium">Bill To:</p>
//               <p className="text-sm text-muted-foreground">
//                 {/* Assuming customer name and address are in invoice */}
//                 {/* {invoice?.customer?.name} */}
//                 Customer Fulani
//                 <br />
//                 {/* {invoice?.customer?.address} */}
//                 90210, Nairobi
//               </p>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item</TableHead>
//                   <TableHead>Qty</TableHead>
//                   <TableHead>Unit Price</TableHead>
//                   <TableHead>Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               {/* <TableBody>
//                 {invoice?.items.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell>{item.quantity}</TableCell>
//                     <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
//                     <TableCell>
//                       ${(item.quantity * item.unitPrice).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody> */}
//             </Table>
//           </div>
//           <div className="grid gap-4 border-t pt-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Subtotal</p>
//               <p className="text-sm">$1,200
//                 {/* {invoice?.subtotal.toFixed(2)} */}

//                 </p>
//             </div>
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Tax 14%
//                 {/* ({invoice?.taxRate}%) */}
//                 </p>
//               {/* <p className="text-sm">${invoice?.tax.toFixed(2)}</p> */}
//             </div>
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Total</p>
//               <p className="text-sm font-bold">$1,200
//                 {/* {invoice?.total.toFixed(2)} */}
//                 </p>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Payment is due within 30 days. Please make payment to our Accounts
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function XIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }






"use client";
import FileDownload from "@/components/FileDownload";
import FileUpload from "@/components/FileUpload";

const InvoicePage = ({ invoiceId }) => {
  const handleUploadSuccess = (filePath: string) => {
    console.log("File uploaded successfully:", filePath);
    // You can update your component state or trigger a refresh here
  };

  const handleUploadError = (error: string) => {
    console.error("Upload failed:", error);
    // You can show an error message to the user here
  };

  return (
    <div>
      <h1>Invoice #{invoiceId}</h1>
      <FileUpload
        entityType="invoice"
        entityId={invoiceId}
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        className="mb-3"
      />
      <FileDownload
        entityType="invoice"
        entityId={invoiceId}
        fileName={`invoice_${invoiceId}.pdf`}
        buttonText="Download File"
      />
    </div>
  );
};

export default InvoicePage;







// "use client";

// import { useState } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import FileUpload from "@/components/FileUpload";
// import FileDownload from "@/components/FileDownload";
// import { InvoiceType } from "@/lib/types";

// async function getInvoiceById(id: string): Promise<InvoiceType> {
//   const response = await fetch(
//     `http://127.0.0.1:8000/api/invoicing/invoices/${id}/`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch invoice");
//   }

//   return response.json();
// }

// export default function Invoice() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);

//   const {
//     data: invoice,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["invoice", id],
//     queryFn: () => getInvoiceById(id as string),
//     enabled: !!id,
//   });

//   const handleUploadSuccess = (filePath: string) => {
//     console.log("File uploaded successfully:", filePath);
//     setUploadStatus('Upload successful');
//   };

//   const handleUploadError = (error: string) => {
//     console.error("Upload failed:", error);
//     setUploadStatus('Upload failed');
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error)
//     return (
//       <p>
//         Error loading invoice:{" "}
//         {error instanceof Error ? error.message : "Unknown error"}
//       </p>
//     );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
//       <div className="relative w-full max-w-3xl rounded-lg bg-background shadow-2xl">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute top-4 right-4 rounded-full"
//           onClick={() => router.back()}
//         >
//           <XIcon className="h-5 w-5" />
//           <span className="sr-only">Close</span>
//         </Button>
//         <div className="grid gap-8 p-8 md:p-12">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Image
//                 src="/placeholder.svg"
//                 alt="Company Logo"
//                 width={48}
//                 height={48}
//                 className="rounded-md"
//               />
//               <div className="grid gap-1">
//                 <h2 className="text-2xl font-bold">Customer Fulani</h2>
//                 <p className="text-sm text-muted-foreground">90210, Nairobi</p>
//               </div>
//             </div>
//             <div className="grid gap-1 text-right">
//               <p className="text-sm font-medium">
//                 Invoice #{invoice?.invoice_number}
//               </p>
//               <p className="text-sm text-muted-foreground">Issued: 01/08/2024</p>
//               <p className="text-sm text-muted-foreground">Due: 10/08/2024</p>
//             </div>
//           </div>
//           <div className="grid gap-6">
//             <div className="grid gap-1">
//               <p className="text-sm font-medium">Bill To:</p>
//               <p className="text-sm text-muted-foreground">
//                 Customer Fulani
//                 <br />
//                 90210, Nairobi
//               </p>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item</TableHead>
//                   <TableHead>Qty</TableHead>
//                   <TableHead>Unit Price</TableHead>
//                   <TableHead>Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Add table body content here */}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="grid gap-4 border-t pt-4">
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Subtotal</p>
//               <p className="text-sm">$1,200</p>
//             </div>
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Tax 14%</p>
//               <p className="text-sm">$168</p>
//             </div>
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium">Total</p>
//               <p className="text-sm font-bold">$1,368</p>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               Payment is due within 30 days. Please make payment to our Accounts
//             </p>
//           </div>
//           <div className="flex justify-between items-center">
//             <FileUpload
//               entityType="invoice"
//               entityId={parseInt(id as string)}
//               onUploadSuccess={handleUploadSuccess}
//               onUploadError={handleUploadError}
//               className="mb-3"
//             />
//             {uploadStatus && <p>{uploadStatus}</p>}
//             <FileDownload
//               entityType="invoice"
//               entityId={parseInt(id as string)}
//               fileName={`invoice_${id}.pdf`}
//               buttonText="Download Invoice"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function XIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }