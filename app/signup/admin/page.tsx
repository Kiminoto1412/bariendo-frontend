"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllOrganization } from "@/api/organization/organizationApi";
import { IOrganization } from "@/lib/next-auth";
import { signUp } from "@/api/auth/authApi";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleError } from "@/middlewares/errorMiddleware";
import { useLoading } from "@/stores/use-loading-store";
import SpinnerLoading from "@/components/Loading/Spinner";
import { handleApiResponse } from "@/middlewares/responseMiddleware";

const formSchema = z
  .object({
    email: z.string().email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    firstname: z
      .string()
      .min(2, { message: "Firstname must be at least 2 characters." }),
    lastname: z
      .string()
      .min(2, { message: "Lastname must be at least 2 characters." }),
    organizationName: z.string(),
    isAccept: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: "Please read and accept the terms and conditions",
      }),
  })
  .refine(
    (obj) => {
      return obj.password === obj.confirmPassword;
    },
    {
      message: "Passwords didn't match!",
      path: ["confirmPassword"],
    }
  );
const SignupPage = () => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      organizationName: "",
      isAccept: false,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { isAccept, ...restFormValue } = values;
      const newFormData = { ...restFormValue, role: "ADMIN" };
      const res = await signUp(newFormData);
      handleApiResponse(res);
      if (res.status === 200) {
        router.push("/");
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchAllOrganization = async () => {
    try {
      const res = await getAllOrganization(axiosAuth);
      setOrganizations(res.data.payload);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrganization();
  }, []);

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <main className="min-h-screen sm:p-24">
          <div className=" flex w-full justify-center items-center md:flex-auto ">
            <div className="w-full sm:border-[1px] sm:rounded-lg px-6 py-10 sm:p-0">
              <div className="sm:bg-gradient-to-b sm:from-redLogInButton sm:to-[#FC5C7D] sm:shadow drop-shadow-md sm:drop-shadow-none px-4 py-2 text-gray-600 sm:text-white font-semibold text-2xl sm:border-b-[1px] sm:rounded-t-lg">
                Sign Up
              </div>
              {/* input form */}
              <div className="px-4 py-6 space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
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
                              className={`${
                                fieldState.error ? "border-red-600" : ""
                              }`}
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
                              className={`${
                                fieldState.error ? "border-red-600" : ""
                              } `}
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-redLogInButton font-semibold">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={`${
                                fieldState.error ? "border-red-600" : ""
                              } `}
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-redLogInButton font-semibold">
                            Firstname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={`${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                              placeholder="firstname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-redLogInButton font-semibold">
                            Lastname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className={`${
                                fieldState.error ? "border-red-600" : ""
                              }`}
                              placeholder="lastname"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-redLogInButton font-semibold">
                            Organization
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value?.toString()}
                            >
                              <SelectTrigger
                                className={`w-full ${
                                  fieldState.error ? "border-red-600" : ""
                                }`}
                              >
                                <SelectValue placeholder="Select your organization" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {organizations?.map((organization, id) => {
                                    return (
                                      <SelectItem
                                        key={id}
                                        value={organization.name as any}
                                      >
                                        {organization.name}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isAccept"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="policy"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className={` ${
                                  fieldState.error
                                    ? "border-red-600 border-2"
                                    : ""
                                } ${field.value ? "border-none" : ""}`}
                                style={{
                                  backgroundColor: field.value
                                    ? "#F85F6A"
                                    : "initial",
                                }}
                              />
                              <label
                                htmlFor="policy"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I agree to the{" "}
                                <span className="text-redLogInButton font-semibold">
                                  Terms of Services
                                </span>{" "}
                                and
                                <span className="text-redLogInButton font-semibold">
                                  {" "}
                                  Privacy Policy
                                </span>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">
                      <div className="font-semibold mr-1">Continue</div>
                    </Button>
                  </form>
                </Form>
                <div className="flex justify-center gap-x-2 text-gray-400 font-semibold">
                  <div>{`Have an account?`}</div>
                  <Link href="/" className="text-orange-500 hover:underline">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SignupPage;
