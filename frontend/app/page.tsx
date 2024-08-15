// "use client"

// import {
//   Card,
//   CardHeader,
//   CardDescription,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { CartesianGrid, XAxis, Bar, BarChart, Line, LineChart } from "recharts";
// import {
//   ChartTooltipContent,
//   ChartTooltip,
//   ChartContainer,
// } from "@/components/ui/chart";

// export default function Home() {
//   return (
//     <div className="grid min-h-screen w-full grid-cols-1 gap-4 bg-muted/40 p-4 md:grid-cols-2 md:gap-8 md:p-2 lg:grid-cols-3 lg:gap-12 lg:p-12">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
//         <Card>
//           <CardHeader>
//             <CardDescription>Total Assets</CardDescription>
//             <CardTitle>$1,234,567</CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardDescription>Total Liabilities</CardDescription>
//             <CardTitle>$456,789</CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardDescription>Equity</CardDescription>
//             <CardTitle>$777,778</CardTitle>
//           </CardHeader>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
//         <Card>
//           <CardHeader>
//             <CardDescription>Sales</CardDescription>
//             <CardTitle>$987,654</CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardDescription>Expenses</CardDescription>
//             <CardTitle>$654,321</CardTitle>
//           </CardHeader>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardDescription>Purchases</CardDescription>
//             <CardTitle>$321,987</CardTitle>
//           </CardHeader>
//         </Card>
//       </div>
//       <div className="col-span-1 lg:col-span-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Financial Charts</CardTitle>
//             <CardDescription>
//               Visualize your key financial metrics
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="bar">
//               <TabsList>
//                 <TabsTrigger value="bar">Bar Chart</TabsTrigger>
//                 <TabsTrigger value="line">Line Chart</TabsTrigger>
//                 <TabsTrigger value="comparative">Comparative Chart</TabsTrigger>
//               </TabsList>
//               <TabsContent value="bar">
//                 <BarchartChart className="aspect-[16/9]" />
//               </TabsContent>
//               <TabsContent value="line">
//                 <LinechartChart className="aspect-[16/9]" />
//               </TabsContent>
//               <TabsContent value="comparative">
//                 <BarchartChart className="aspect-[16/9]" />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// function BarchartChart(props) {
//   return (
//     <div {...props}>
//       <ChartContainer
//         config={{
//           desktop: {
//             label: "Desktop",
//             color: "hsl(var(--chart-1))",
//           },
//         }}
//         className="min-h-[300px]"
//       >
//         <BarChart
//           accessibilityLayer
//           data={[
//             { month: "January", desktop: 186 },
//             { month: "February", desktop: 305 },
//             { month: "March", desktop: 237 },
//             { month: "April", desktop: 73 },
//             { month: "May", desktop: 209 },
//             { month: "June", desktop: 214 },
//           ]}
//         >
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent hideLabel />}
//           />
//           <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
//         </BarChart>
//       </ChartContainer>
//     </div>
//   );
// }

// function LinechartChart(props) {
//   return (
//     <div {...props}>
//       <ChartContainer
//         config={{
//           desktop: {
//             label: "Desktop",
//             color: "hsl(var(--chart-1))",
//           },
//         }}
//       >
//         <LineChart
//           accessibilityLayer
//           data={[
//             { month: "January", desktop: 186 },
//             { month: "February", desktop: 305 },
//             { month: "March", desktop: 237 },
//             { month: "April", desktop: 73 },
//             { month: "May", desktop: 209 },
//             { month: "June", desktop: 214 },
//           ]}
//           margin={{
//             left: 12,
//             right: 12,
//           }}
//         >
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent hideLabel />}
//           />
//           <Line
//             dataKey="desktop"
//             type="natural"
//             stroke="var(--color-desktop)"
//             strokeWidth={2}
//             dot={false}
//           />
//         </LineChart>
//       </ChartContainer>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            onClick={() => router.push("/sales/newsale")} // Use router.push for navigation
            className="ml-4 py-2 px-4 rounded border"
          >
            New Sale
          </Button>

          <Button
            onClick={() => router.push("/purchases/newpurchase")} // Use router.push for navigation
            className="ml-4 py-2 px-4 rounded border"
          >
            New Purchase
          </Button>
          <Button
            onClick={() => router.push("/inventory/newitem")} // Use router.push for navigation
            className="ml-4 py-2 px-4 rounded border"
          >
            New Item
          </Button>
        </div>
        <div className="mt-6 rounded-lg border bg-background p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Fast Moving Items</h2>
            <Link
              href="#"
              className="text-primary hover:underline"
              prefetch={false}
            >
              View All
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Acme Widget</h3>
                    <p className="text-muted-foreground">SKU: 123456</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">$49.99</p>
                    <p className="text-muted-foreground">100 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Acme Gadget</h3>
                    <p className="text-muted-foreground">SKU: 654321</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">$99.99</p>
                    <p className="text-muted-foreground">75 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Acme Thingamajig</h3>
                    <p className="text-muted-foreground">SKU: 987654</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">$24.99</p>
                    <p className="text-muted-foreground">125 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Acme Doodad</h3>
                    <p className="text-muted-foreground">SKU: 456789</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">$14.99</p>
                    <p className="text-muted-foreground">150 sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 rounded-lg border bg-background p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Sales, Expenses, and Revenue</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                This Month
              </Button>
              <Button variant="outline" size="sm">
                Last Month
              </Button>
              <Button variant="outline" size="sm">
                YTD
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <LinechartChart className="aspect-[16/9]" />
          </div>
        </div>
      </main>
    </div>
  );
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
