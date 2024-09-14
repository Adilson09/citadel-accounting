import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function Settings() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header section */}
      {/* Uncomment if needed */}
      {/* 
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          prefetch={false}
        >
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Accounting</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Invoices
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Expenses
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Reports
          </Link>
          <Link href="#" className="font-bold" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <Image
              src="/placeholder.svg"
              width="32"
              height="32"
              className="rounded-full border"
              alt="Avatar"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      */}

      <main className="flex flex-1 bg-muted/40 p-4 md:p-8">
        <div className="max-w-6xl w-full mx-auto">
          <h1 className="font-semibold text-3xl mb-6">Settings</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <nav className="text-sm text-muted-foreground md:col-span-1">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/settings/company"
                    className="font-semibold text-primary"
                    prefetch={false}
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings/ChartOfAccounts"
                    className="font-semibold"
                    prefetch={false}
                  >
                    Chart of Accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-semibold" prefetch={false}>
                    User Permissions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-semibold" prefetch={false}>
                    Date Formats
                  </Link>
                </li>
                <li>
                  <Link href="#" className="font-semibold" prefetch={false}>
                    Other Settings
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                  <CardDescription>
                    Upload and preview your company logo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      width="100"
                      height="100"
                      alt="Company Logo"
                      className="rounded-full"
                      style={{ aspectRatio: "100/100", objectFit: "cover" }}
                    />
                    <div className="flex gap-2">
                      <Button variant="outline">Upload Logo</Button>
                      <Button variant="outline">Remove Logo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chart of Accounts</CardTitle>
                  <CardDescription>
                    View and edit your chart of accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Cash</TableCell>
                          <TableCell>Asset</TableCell>
                          <TableCell>$10,000.00</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Accounts Receivable
                          </TableCell>
                          <TableCell>Asset</TableCell>
                          <TableCell>$25,000.00</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Accounts Payable
                          </TableCell>
                          <TableCell>Liability</TableCell>
                          <TableCell>$15,000.00</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button>Add Account</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>
                    Manage user roles and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            John Doe
                          </TableCell>
                          <TableCell>Admin</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Jane Smith
                          </TableCell>
                          <TableCell>Accountant</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Bob Johnson
                          </TableCell>
                          <TableCell>User</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button>Add User</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Settings</CardTitle>
                  <CardDescription>
                    Manage miscellaneous settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <Checkbox id="email-notifications" defaultChecked>
                        Receive email notifications
                      </Checkbox>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="backup-schedule">Backup Schedule</Label>
                      <Select id="backup-schedule">
                        <SelectTrigger>
                          <SelectValue placeholder="Select backup schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FrameIcon(props) {
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
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}
