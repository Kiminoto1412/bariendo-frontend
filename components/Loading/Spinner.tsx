import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function SpinnerLoading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30"></div>

      {/* Loading Spinner */}
      <div className="relative z-10">
        <CircularProgress color="primary" />
      </div>
    </div>
  );
}
