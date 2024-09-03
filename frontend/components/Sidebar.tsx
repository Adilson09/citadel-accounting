// "use client";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathname = usePathname();

//   return (
//     <section className="sidebar">
//       <nav className="flex flex-col gap-4">
//         <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
//           <Image
//             src="/icons/logo.svg"
//             width={34}
//             height={34}
//             alt="Horizon logo"
//             className="size-[24px] max-xl:size-14"
//           />
//           <h1 className="sidebar-logo">Horizon</h1>
//         </Link>

//         {/* {sidebarLinks.map((item) => {
//           const isActive =
//             pathname === item.route || pathname.startsWith(`${item.route}/`);

//           return (
//             <Link
//               href={item.route}
//               key={item.label}
//               className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
//             >
//               <div className="relative size-6">
//                 <Image
//                   src={item.imgURL}
//                   alt={item.label}
//                   fill
//                   className={cn({
//                     "brightness-[3] invert-0": isActive,
//                   })}
//                 />
//               </div>
//               <p className={cn("sidebar-label", { "!text-white": isActive })}>
//                 {item.label}
//               </p>
//             </Link>
//           );
//         })} */}
//       </nav>
//     </section>
//   );
// };

// export default Sidebar;

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons for toggle button
import { Button } from "./ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Assuming you have this array defined somewhere in your code
  const sidebarLinks = [
    { route: "/dashboard", label: "Dashboard", imgURL: "/icons/dashboard.svg" },
    {
      route: "/transactions",
      label: "Transactions",
      imgURL: "/icons/transactions.svg",
    },
    // Add more links as needed
  ];

  return (
    <section
      className={cn(
        "sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="cursor-pointer flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
              className={cn("transition-all", {
                "w-6 h-6": isCollapsed,
                "w-8 h-8": !isCollapsed,
              })}
            />
            {!isCollapsed && (
              <h1 className="sidebar-logo text-lg font-bold">Horizon</h1>
            )}
          </Link>
          <Button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-500 hover:bg-gray-400"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>
        <div className="flex-grow mt-8">
          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  "flex items-center py-3 px-4 mb-2",
                  isCollapsed ? "justify-center" : "justify-start",
                  isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                )}
              >
                <div className="relative w-6 h-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn({
                      "text-blue-600": isActive,
                    })}
                  />
                </div>
                {!isCollapsed && (
                  <span
                    className={cn("ml-3 transition-opacity", {
                      "opacity-0": isCollapsed,
                    })}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
