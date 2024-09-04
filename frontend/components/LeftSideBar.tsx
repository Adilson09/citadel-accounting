// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// export default function LeftSideBar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className=" flex-row h-screen overflow-auto bg-gray-500 ">
//       <div className="flex h-12 items-center justify-between ">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="rounded-full"
//           onClick={toggleSidebar}
//         >
//           <ChevronLeftIcon className="h-5 w-5" />
//         </Button>
//       </div>
//       {!isCollapsed && (
//         <aside
//           className={`fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background transition-all duration-300`}
//         >
//           <nav className="flex-1 py-6 h-screen">
//             <Accordion type="single" collapsible className="space-y-2">
//               {[
//                 { Icon: HomeIcon, label: "Dashboard", value: "dashboard" },
//                 { Icon: PackageIcon, label: "Products", value: "products" },
//                 { Icon: ShoppingCartIcon, label: "Orders", value: "orders" },
//                 { Icon: UsersIcon, label: "Customers", value: "customers" },
//                 { Icon: SettingsIcon, label: "Settings", value: "settings" },
//               ].map(({ Icon, label, value }) => (
//                 <AccordionItem value={value} key={value}>
//                   <AccordionTrigger className="flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
//                     <div className="flex items-center gap-3">
//                       <Icon className="h-5 w-5" />
//                       <span>{label}</span>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent className="space-y-1 px-3 pt-2">
//                     {/* Content */}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </nav>

//           <div className="border-t px-4 py-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Avatar className="h-6 w-6 border">
//                     <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
//                     <AvatarFallback>KM</AvatarFallback>
//                   </Avatar>
//                   <span>Kelly Mweu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="bg-gray-300 w-56"
//                 align="start"
//                 forceMount
//               >
//                 {/* DropdownMenuItems */}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </aside>
//       )}

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 flex-1 ${
//           isCollapsed ? "ml-0" : "ml-64"
//         }`}
//       >
//         <Button onClick={toggleSidebar} variant="ghost" size="icon">
//           {isCollapsed ? (
//             <ChevronRightIcon className="h-5 w-5" />
//           ) : (
//             <ChevronLeftIcon className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function ChevronRightIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M16.28 12.53a.75.75 0 000-1.06l-7.5-7.5a.75.75 0 10-1.06 1.06L14.69 12l-6.97 6.97a.75.75 0 101.06 1.06l7.5-7.5z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function MenuIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M4.5 6.75A.75.75 0 015.25 6h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 5.25A.75.75 0 015.25 11h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function HomeIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M12 3a1.5 1.5 0 011.5 1.5v.6l5.7 3.3A1.5 1.5 0 0120 10.9v8.1A1.5 1.5 0 0118.5 20h-3A1.5 1.5 0 0114 18.5V15h-4v3.5A1.5 1.5 0 018.5 20h-3A1.5 1.5 0 014 18.5v-8.1a1.5 1.5 0 01.8-1.3l5.7-3.3v-.6A1.5 1.5 0 0112 3z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function ChevronDownIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M12 16.25a.75.75 0 01-.53-.22l-5-5a.75.75 0 111.06-1.06L12 14.94l4.47-4.47a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-.53.22z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function PackageIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M2.25 5.93A2.25 2.25 0 014.047 4h15.906A2.25 2.25 0 0122.5 5.93v12.14A2.25 2.25 0 0119.953 20H4.047A2.25 2.25 0 012.25 18.07V5.93zM5.25 7.5a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm5.25-.75a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9zm5.25.75a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function ShoppingCartIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M4.75 3.5a.75.75 0 00-1.5 0v1.7a1.25 1.25 0 001.25 1.25h13.25a1.25 1.25 0 001.25-1.25V3.5a.75.75 0 00-1.5 0v1.7H4.75V3.5zm14.25 3.6a.75.75 0 00-.75-.75H5.75a.75.75 0 00-.75.75v11.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V7.1zM6.75 8.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zm8.5 0a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm-5 0a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zm8.25 9.75a.75.75 0 010-1.5H5.75a.75.75 0 010 1.5h10.5z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// function UsersIcon(props) {
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
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// }

// function SettingsIcon(props) {
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
//       <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   );
// }

// function ChevronLeftIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

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

export default function LeftSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex-row h-screen overflow-auto bg-gray-500">
      {/* Sidebar */}
      <div className="hidden sm:flex h-12 items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full ml-auto mr-4"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <aside
          className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300 ${
            isCollapsed ? "w-16" : "w-64"
          }`}
        >
          <nav className="flex-1 py-6 h-screen">
            <Accordion type="single" collapsible className="space-y-2">
              {[
                { Icon: HomeIcon, label: "Dashboard", value: "dashboard" },
                { Icon: PackageIcon, label: "Products", value: "products" },
                { Icon: ShoppingCartIcon, label: "Orders", value: "orders" },
                { Icon: UsersIcon, label: "Customers", value: "customers" },
                { Icon: SettingsIcon, label: "Settings", value: "settings" },
              ].map(({ Icon, label, value }) => (
                <AccordionItem value={value} key={value}>
                  <AccordionTrigger className="flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5" />
                      {!isCollapsed && <span>{label}</span>}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 px-3 pt-2">
                    {/* Content */}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>

          <div className="border-t px-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && <span>Kelly Mweu</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-gray-300 w-56"
                align="start"
                forceMount
              >
                {/* DropdownMenuItems */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
      )}

      {/* Mobile Sidebar */}
      <div className="flex sm:hidden h-12 items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full ml-4"
          onClick={toggleMobileMenu}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>

      {isMobileMenuOpen && (
        <aside className="fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background transition-all duration-300 sm:hidden">
          <nav className="flex-1 py-6 h-screen">
            <Accordion type="single" collapsible className="space-y-2">
              {[
                { Icon: HomeIcon, label: "Dashboard", value: "dashboard" },
                { Icon: PackageIcon, label: "Products", value: "products" },
                { Icon: ShoppingCartIcon, label: "Orders", value: "orders" },
                { Icon: UsersIcon, label: "Customers", value: "customers" },
                { Icon: SettingsIcon, label: "Settings", value: "settings" },
              ].map(({ Icon, label, value }) => (
                <AccordionItem value={value} key={value}>
                  <AccordionTrigger className="flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-muted data-[state=open]:bg-muted">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 px-3 pt-2">
                    {/* Content */}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>

          <div className="border-t px-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  <span>Kelly Mweu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-gray-300 w-56"
                align="start"
                forceMount
              >
                {/* DropdownMenuItems */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Main Content Here */}
      </div>
    </div>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.28 12.53a.75.75 0 000-1.06l-7.5-7.5a.75.75 0 10-1.06 1.06L14.69 12l-6.97 6.97a.75.75 0 101.06 1.06l7.5-7.5z"
        clipRule="evenodd"
      />
    </svg>
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

function ChevronLeftIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
