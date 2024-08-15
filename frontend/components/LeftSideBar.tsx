"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LeftSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Sheet>
      <div className="min-h-screen static ">
        <SheetClose asChild>
          <Button>Close</Button>
        </SheetClose>
        <aside
          className={`fixed inset-y-0 left-0 z-10 flex ${
            isCollapsed ? "w-16" : "w-64"
          } flex-col border-r bg-background transition-all duration-300 sm:static sm:w-64`}
          data-collapsed={isCollapsed}
        >
          <div className="flex h-12 items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full sm:hidden"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-2">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="dashboard">
                <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                  <div className="flex items-center gap-3">
                    <HomeIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-3 pt-2">
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Overview
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Analytics
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Reporting
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="products">
                <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                  <div className="flex items-center gap-3">
                    <PackageIcon className="h-5 w-5" />
                    <span>Products</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-3 pt-2">
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    All Products
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Categories
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Inventory
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Pricing
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders">
                <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                  <div className="flex items-center gap-3">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Orders</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-3 pt-2">
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    All Orders
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Pending
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Shipped
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Cancelled
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="customers">
                <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                  <div className="flex items-center gap-3">
                    <UsersIcon className="h-5 w-5" />
                    <span>Customers</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-3 pt-2">
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    All Customers
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    VIP Customers
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Subscriptions
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Referrals
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="settings">
                <AccordionTrigger className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="h-5 w-5" />
                    <span>Settings</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-3 pt-2">
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    General
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Integrations
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Notifications
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted"
                    prefetch={false}
                  >
                    Billing
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
          <div className="border-t px-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start" forceMount>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
      </div>
    </Sheet>
  );
}

function MenuIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.5 6.75A.75.75 0 015.25 6h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 5.25A.75.75 0 015.25 11h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 3a1.5 1.5 0 011.5 1.5v.6l5.7 3.3A1.5 1.5 0 0120 10.9v8.1A1.5 1.5 0 0118.5 20h-3A1.5 1.5 0 0114 18.5V15h-4v3.5A1.5 1.5 0 018.5 20h-3A1.5 1.5 0 014 18.5v-8.1a1.5 1.5 0 01.8-1.3l5.7-3.3v-.6A1.5 1.5 0 0112 3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 16.25a.75.75 0 01-.53-.22l-5-5a.75.75 0 111.06-1.06L12 14.94l4.47-4.47a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-.53.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PackageIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M2.25 5.93A2.25 2.25 0 014.047 4h15.906A2.25 2.25 0 0122.5 5.93v12.14A2.25 2.25 0 0119.953 20H4.047A2.25 2.25 0 012.25 18.07V5.93zM5.25 7.5a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm5.25-.75a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9zm5.25.75a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShoppingCartIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.75 3.5a.75.75 0 00-1.5 0v1.7a1.25 1.25 0 001.25 1.25h13.25a1.25 1.25 0 001.25-1.25V3.5a.75.75 0 00-1.5 0v1.7H4.75V3.5zm14.25 3.6a.75.75 0 00-.75-.75H5.75a.75.75 0 00-.75.75v11.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V7.1zM6.75 8.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zm8.5 0a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm-5 0a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zm8.25 9.75a.75.75 0 010-1.5H5.75a.75.75 0 010 1.5h10.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
