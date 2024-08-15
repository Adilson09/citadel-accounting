import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarDaysIcon, Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* <header className="bg-background border-b px-4 py-3 flex items-center justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <LayoutGridIcon className="w-6 h-6" />
            <span className="sr-only">Acme Construction</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-6 text-sm">
            <Link href="#" className="font-bold" prefetch={false}>
              Projects
            </Link>
            <Link href="#" className="text-muted-foreground" prefetch={false}>
              Timelines
            </Link>
            <Link href="#" className="text-muted-foreground" prefetch={false}>
              Reports
            </Link>
            <Link href="#" className="text-muted-foreground" prefetch={false}>
              Invoices
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
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
      </header> */}
      <main className="flex-1 grid grid-cols-[1fr_300px] gap-8 p-8 sm:p-10">
        <div className="grid gap-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>Acme Construction Project</CardTitle>
                <CardDescription>Residential Building</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoveHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Project</DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Delete Project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>Bill of Quantities</CardTitle>
                <CardDescription>Materials and Costs</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Concrete</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>m³</TableCell>
                    <TableCell>$80</TableCell>
                    <TableCell>$8,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Steel Rebar</TableCell>
                    <TableCell>5,000</TableCell>
                    <TableCell>kg</TableCell>
                    <TableCell>$2</TableCell>
                    <TableCell>$10,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bricks</TableCell>
                    <TableCell>50,000</TableCell>
                    <TableCell>pcs</TableCell>
                    <TableCell>$0.50</TableCell>
                    <TableCell>$25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cement</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>bags</TableCell>
                    <TableCell>$10</TableCell>
                    <TableCell>$5,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>Project Status Updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Report
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-04-15</TableCell>
                    <TableCell>
                      <Badge variant="secondary">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={30} aria-label="30% complete" />
                    </TableCell>
                    <TableCell>Foundation work started</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-30</TableCell>
                    <TableCell>
                      <Badge variant="secondary">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={60} aria-label="60% complete" />
                    </TableCell>
                    <TableCell>Framing completed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-07-15</TableCell>
                    <TableCell>
                      <Badge variant="secondary">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={80} aria-label="80% complete" />
                    </TableCell>
                    <TableCell>
                      Electrical and plumbing work in progress
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-01</TableCell>
                    <TableCell>
                      <Badge variant="secondary">In Progress</Badge>
                    </TableCell>
                    <TableCell>
                      <Progress value={90} aria-label="90% complete" />
                    </TableCell>
                    <TableCell>Drywall and painting in progress</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>New Project</CardTitle>
                <CardDescription>
                  Add a new construction project
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Select id="type">
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start font-normal"
                      >
                        Pick a date
                        <div className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start font-normal"
                      >
                        Pick a date
                        <div className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                  />
                </div>
                <Button type="submit" className="justify-self-end">
                  Create Project
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="grid gap-1">
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Upcoming Milestones</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <div>
                    <div>Foundation Completed</div>
                    <div>2023-05-15</div>
                  </div>
                  <div>
                    The foundation work for the building has been completed.
                  </div>
                </div>
                <div>
                  <div>
                    <div>Framing Completed</div>
                    <div>2023-06-30</div>
                  </div>
                  <div>
                    The framing of the building structure has been completed.
                  </div>
                </div>
                <div>
                  <div>
                    <div>Electrical Work Completed</div>
                    <div>2023-08-15</div>
                  </div>
                  <div>
                    The electrical work for the building has been completed.
                  </div>
                </div>
                <div>
                  <div>
                    <div>Plumbing Work Completed</div>
                    <div>2023-09-30</div>
                  </div>
                  <div>
                    The plumbing work for the building has been completed.
                  </div>
                </div>
                <div>
                  <div>
                    <div>Drywall and Painting Completed</div>
                    <div>2023-11-15</div>
                  </div>
                  <div>
                    The drywall and painting work for the building has been
                    completed.
                  </div>
                </div>
                <div>
                  <div>
                    <div>Project Completion</div>
                    <div>2023-12-31</div>
                  </div>
                  <div>The construction project has been completed.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function LayoutGridIcon(props) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
