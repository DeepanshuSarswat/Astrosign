import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./ui/Navbar";
import { Footer } from "./ui/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Astro Sign",
  description: "Elevate your document signing experience with Astro Sign - the premier digital signature app. Seamlessly sign and manage documents online, with intuitive features for customization and collaboration. Ensure security and efficiency in your workflow with Astro Sign. Try it today!"

  ,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Head>
			<link rel='icon' href='/favicon.ico' />
		</Head>
        <div className="h-full flex flex-col gap-8 items-center">
        <Navbar />
        {children}
        <Footer />
        </div>
      </body>
    </html>
  );
}
