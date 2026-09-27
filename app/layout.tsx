import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shivam Collection",
  description: "Mobile-first collection management website"
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}