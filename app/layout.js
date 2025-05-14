"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from "react";


// export const metadata = {
//   title: "Movie App",
//   description: "Popular movies site",
// };

export default function RootLayout({ children }) {
    useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }
  , []);
  return (
    <html lang="en">
      <body>
          <main>{children}</main>
      </body>
    </html>
  );
}
