import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Liabilities() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Liabilities</h1>
        <p className="text-muted-foreground">
          View and manage your outstanding liabilities.
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full table-auto border-collapse">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-4 py-3 text-left font-medium">
                Liability Type
              </TableHead>
              <TableHead className="px-4 py-3 text-left font-medium">
                Description
              </TableHead>
              <TableHead className="px-4 py-3 text-right font-medium">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-b px-4 py-3">Loan</TableCell>
              <TableCell className="border-b px-4 py-3">
                Business loan from ABC Bank
              </TableCell>
              <TableCell className="border-b px-4 py-3 text-right">
                $50,000.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-b px-4 py-3">Credit Card</TableCell>
              <TableCell className="border-b px-4 py-3">
                Company credit card
              </TableCell>
              <TableCell className="border-b px-4 py-3 text-right">
                $12,500.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-b px-4 py-3">Mortgage</TableCell>
              <TableCell className="border-b px-4 py-3">
                Office building mortgage
              </TableCell>
              <TableCell className="border-b px-4 py-3 text-right">
                $250,000.00
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-b px-4 py-3">Lease</TableCell>
              <TableCell className="border-b px-4 py-3">
                Equipment lease
              </TableCell>
              <TableCell className="border-b px-4 py-3 text-right">
                $5,000.00
              </TableCell>
            </TableRow>
          </TableBody>
          <tfoot>
            <TableRow className="bg-muted font-medium">
              <TableCell className="px-4 py-3 text-left">Total</TableCell>
              <TableCell className="px-4 py-3" />
              <TableCell className="px-4 py-3 text-right">
                $317,500.00
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
