import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useModal } from "@/stores/use-modal-store";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleError } from "@/middlewares/errorMiddleware";
import { changePasswordApi } from "@/api/auth/authApi";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const passwordRegex =
  /^(?=[A-Za-z].*[A-Za-z]$)(?=(?:[^0-9]*[0-9]){2}[^0-9]*$)(?!.*[$@#])^[A-Za-z0-9]+$/;

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." })
      .refine((data) => passwordRegex.test(data), {
        message:
          "Password must start and end with alphabet, contain at least 2 numerical digits, and exclude special characters like $, @, #, etc.",
      }),

    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters." }),
    // .refine((data) => data.password === data.confirmPassword, {
    //   message: "Passwords do not match.",
    // }),
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

function ChangePasswordDialogue() {
  const axiosAuth = useAxiosAuth();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "changePassword";

  const handleClose = () => {
    onClose();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isValid } = formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await changePasswordApi(axiosAuth, values);
      if (res.status === 200) {
        handleClose();
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 z-[99999] gap-0">
          <DialogHeader className="text-start p-4 border-b-[1px]">
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center space-x-2 px-8 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field, fieldState }) => (
                    <FormItem className="grid grid-cols-10 items-center space-y-0">
                      <FormLabel className="text-black flex gap-1 col-span-3">
                        Current Password <p className="text-red-600">*</p>
                      </FormLabel>
                      <FormControl className="col-start-5 col-end-11 ">
                        <Input
                          type="password"
                          {...field}
                          className={`${
                            fieldState.error ? "border-red-600" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="col-start-5 col-end-11" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem className="grid grid-cols-10 items-center space-y-0">
                      <FormLabel className="text-black flex gap-1 col-span-3">
                        New Password <p className="text-red-600">*</p>
                      </FormLabel>
                      <FormControl className="col-start-5 col-end-11">
                        <Input
                          type="password"
                          {...field}
                          className={`${
                            fieldState.error ? "border-red-600" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="col-start-5 col-end-11" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem className="grid grid-cols-10 items-center space-y-0">
                      <FormLabel className="text-black flex gap-1 col-span-4">
                        Confirm New Password <p className="text-red-600">*</p>
                      </FormLabel>
                      <FormControl className="col-start-5 col-end-11">
                        <Input
                          type="password"
                          {...field}
                          className={`${
                            fieldState.error ? "border-red-600" : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="col-start-5 col-end-11" />
                    </FormItem>
                  )}
                />

                <div className="bg-blueHintChangePassword p-3 text-sm font-seogoeUiLight rounded-md">
                  Password must start and end with alphabet, contain atleast 2
                  numerical digits with exclusion special characters e.g. $, @,
                  #, etc.
                </div>

                <Button
                  className={`w-full `}
                  type="submit"
                  // disabled={!isDirty || !isValid}
                >
                  <div className="font-bold mr-1">Change Password</div>
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePasswordDialogue;
