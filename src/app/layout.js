import Header from "@/components/header/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { AppProvider } from "@/context/context";
import { AuthContextProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700"],
});

export const metadata = {
  title: "User Management App",
  description: "this is used for all user related operations",
};

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <AuthContextProvider>
        <html lang="en">
          <body suppressHydrationWarning={true}  className={roboto.className}>
            <Header />
            <main className=" bg-slate-50 min-h-screen text-black">
              {children}
            </main>
            <Footer />

            <ToastContainer />
          </body>
        </html>
      </AuthContextProvider>
    </AppProvider>
  );
}
