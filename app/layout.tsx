import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { AlertProvider } from "@/components/providers/alert-provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material";

const seogoeUi = localFont({
  src: [
    {
      path: "../fonts/Segoe-UI-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Segoe-UI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Segoe-UI-Semi-Bold.ttf",
      weight: "600",
      style: "semiBold",
    },
    {
      path: "../fonts/Segoe-UI-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Segoe-UI.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Segoe-UI-Light.ttf",
      weight: "300",
      style: "light",
    },
  ],
  variable: "--font-seogoe-ui",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-seogoeUi ${seogoeUi.variable} `}>
        <Providers>
          {/* <StyledEngineProvider injectFirst> */}
          <AlertProvider />
          <ToastContainer />
          {children}
          {/* </StyledEngineProvider> */}
        </Providers>
      </body>
    </html>
  );
}
