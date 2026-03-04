import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
    title: "NIC Go Ventures | We Drive Innovation",
    description: "Connecting startups and ventures across Vietnam and globally. The official innovation platform of the National Innovation Center.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://api.fontshare.com" />
                <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased flex flex-col min-h-screen" style={{ backgroundColor: '#f2f1ed', color: '#161616' }}>
                <LanguageProvider>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
