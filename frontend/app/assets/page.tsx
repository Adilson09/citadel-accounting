import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Assets() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LandmarkIcon className="h-6 w-6" />
            <h1 className="text-lg md:text-xl font-semibold">Acme Inc.</h1>
          </div>
          <h2 className="text-base md:text-lg font-medium">Balance Sheet</h2>
        </div>
      </header>
      <main className="flex-1 bg-background py-6 px-4 md:py-8 md:px-6">
        <div className="container mx-auto grid gap-6 md:gap-8">
          <section>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Current Assets
            </h3>
            <div className="border rounded-lg overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Cash and Cash Equivalents</TableCell>
                    <TableCell className="text-right">$1,234,567</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accounts Receivable</TableCell>
                    <TableCell className="text-right">$987,654</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Inventory</TableCell>
                    <TableCell className="text-right">$456,789</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prepaid Expenses</TableCell>
                    <TableCell className="text-right">$123,456</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
          <section>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Non-Current Assets
            </h3>
            <div className="border rounded-lg overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Property, Plant and Equipment</TableCell>
                    <TableCell className="text-right">$5,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Investments</TableCell>
                    <TableCell className="text-right">$2,500,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Intangible Assets</TableCell>
                    <TableCell className="text-right">$1,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Long-Term Deposits</TableCell>
                    <TableCell className="text-right">$500,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
          <section>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between text-base md:text-lg font-semibold">
                <span>Total Assets</span>
                <span>$8,234,954</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function LandmarkIcon(props) {
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
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
