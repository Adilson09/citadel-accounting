// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
// import "./globals.css";
// import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider";
// import Provider from "@/lib/Providers";
// import LeftSideBar from "@/components/LeftSideBar";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";

// const fontSans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Citadel",
//   description: "Accounting",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={cn(
//           "min-h-screen font-sans antialiased",
//           fontSans.variable
//         )}
//       >
//         <Provider>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="light"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <div className="flex flex-col min-h-screen">
//               <Header />
//               <div className="flex flex-1">
//                 <LeftSideBar />
//                 <main className="flex-1 overflow-y-auto">
//                   {children}
//                 </main>
//               </div>
//               <Footer />
//             </div>
//           </ThemeProvider>
//         </Provider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/lib/Providers";
import LeftSideBar from "@/components/LeftSideBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Citadel",
  description: "Accounting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex">
                {/* <LeftSideBar /> */}
                {children}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
