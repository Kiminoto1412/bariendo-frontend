import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    };

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full border-t-0 border-x-0 border-b-2 border-input bg-background px-0 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  focus:border-gray-200 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div
              className="text-gray-400 hover:text-redLogInButton cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                togglePasswordVisibility();
              }}
            >
              {inputType === "password" ? <Eye /> : <EyeOff />}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
