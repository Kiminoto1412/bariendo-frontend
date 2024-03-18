"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAlert } from "@/stores/use-alert-store";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { handleError } from "@/middlewares/errorMiddleware";

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

function Login() {
  const { data: session, update, status } = useSession();
  const { onOpenAlert } = useAlert();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.userOrganizations?.length === 1) {
        const userData = {
          ...session?.user,
          organization: session.user.userOrganizations[0].organization,
        };
        update({
          accessToken: session?.accessToken,
          user: userData,
        });
        redirect("/home/booked-appointment");
      } else if ((session.user.userOrganizations?.length as number) > 1) {
        onOpenAlert("loginOrganization", {});
      } else {
      }
    }
  }, [status]);

  return (
    <div className="w-full sm:border-[1px] sm:rounded-lg px-6 py-10 sm:p-0">
      <div className="sm:bg-gradient-to-b sm:from-redLogInButton sm:to-[#FC5C7D] sm:shadow drop-shadow-md sm:drop-shadow-none px-4 py-2 text-gray-600 sm:text-white font-semibold text-2xl sm:border-b-[1px] sm:rounded-t-lg">
        Sign In
      </div>
      {/* input form */}
      <div className="px-4 py-6 space-y-6">
        <div className="text-gray-400 ">Hi there! Nice to meet you again.</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-redLogInButton font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={`${fieldState.error ? "border-red-600" : ""}`}
                      placeholder="Your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-redLogInButton font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={`${fieldState.error ? "border-red-600" : ""} `}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              <div className="font-semibold mr-1">Sign In</div>
            </Button>
          </form>
        </Form>
        <div className="flex justify-center gap-x-2 text-gray-400 font-semibold">
          <div>{`Haven't an account?`}</div>
          <Link href="/signup" className="text-orange-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
