"use client";
import MiniDrawer from "@/components/Sidebar/MiniDrawer";
import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material";
import localFont from "next/font/local";

const seogoeUi = localFont({
  src: [
    {
      path: "../../fonts/Segoe-UI-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../fonts/Segoe-UI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/Segoe-UI-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/Segoe-UI.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-seogoe-ui",
});

function HomeLayout({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    typography: {
      fontFamily: seogoeUi.style.fontFamily,
    },
  });
  return (
    <main className="h-screen min-h-screen sm:p-24">
      <div className="h-full flex w-full justify-center items-center md:flex-auto ">
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </div>
    </main>
  );
}

export default HomeLayout;
