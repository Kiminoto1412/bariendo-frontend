"use client";
import { Button } from "@/components/ui/button";
import React, { use, useRef } from "react";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useLoading } from "@/stores/use-loading-store";
import SpinnerLoading from "@/components/Loading/Spinner";
import { handleError } from "@/middlewares/errorMiddleware";
import { ArrowLeft, LogOut, Plus } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  createAppointment,
  getAllByPatientId,
  getAllDoctor,
  getAllTimeSlots,
} from "@/api/appointment/appointmentApi";
import { IAppointments } from "@/interface/appointment";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  convertTo12HourFormat,
  formatDateToCustomFormat,
  generateDatesOfMonth,
} from "@/utils/DateFormat";
import { signOut } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleApiResponse } from "@/middlewares/responseMiddleware";
import { signUp } from "@/api/auth/authApi";
import { Input } from "@/components/ui/input";
import { IOrganization } from "@/lib/next-auth";
import { ISpecialist } from "@/app/signup/doctor/page";
import { getAllSpecialist } from "@/api/user/userApi";
import { MonthConstant } from "@/utils/MonthConstant";
import { Separator } from "@radix-ui/react-select";

interface IDoctor {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  specialist: string;
  role: string;
}
interface ITimeSlot {
  id?: number;
  time: string;
  status: "AVAILABLE" | "NOT_AVAILABLE" | "BOOKED";
}

const formSchema = z.object({
  specialist: z.string(),
  doctorId: z.number(),
  month: z.number(),
  date: z.number(),
});

function AddNewBookedAppointment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [appointments, setAppointmennts] = useState<IAppointments[]>([]);
  const [specialists, setSpecialists] = useState<ISpecialist[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [allDate, setAllDate] = useState<{ day: number; dayOfWeek: string }[]>(
    []
  );
  const [allTimeSlot, setAllTimeSlot] = useState<ITimeSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<ITimeSlot[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const dayOfMonth = today.getDate();
  const month = today.getMonth() + 1;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialist: undefined,
      doctorId: undefined,
      month: month,
      date: dayOfMonth,
    },
  });
  const fetchAllSpecialist = async () => {
    try {
      const res = await getAllSpecialist(axiosAuth, {
        organizationId: session?.user.organization?.id,
      });
      setSpecialists(res.data.payload);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllDoctor = async (specialistProp: string) => {
    try {
      const res = await getAllDoctor(axiosAuth, {
        specialist: specialistProp,
      });
      setDoctors(res.data.payload);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllTimeSlots = async () => {
    try {
      const { specialist, doctorId, month, date } = form.getValues();
      if (
        specialist !== undefined &&
        doctorId !== undefined &&
        month !== undefined &&
        date !== undefined
      ) {
        const formattedDate = new Date(
          year,
          form.getValues().month - 1,
          form.getValues().date
        );
        const formattedDateString = formattedDate.toISOString();
        const res = await getAllTimeSlots(axiosAuth, {
          date: formattedDateString,
          organizationId: session?.user.organization?.id,
          doctorId: form.getValues().doctorId,
        });
        setAllTimeSlot(res.data.payload);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSlotSelection = (timeSlot: ITimeSlot) => {
    console.log("timeSlot: ", timeSlot);
    const index = selectedTimeSlots.findIndex(
      (slot) => slot.id === timeSlot.id
    );

    if (index === -1) {
      setSelectedTimeSlots((prevSlots) => [...prevSlots, timeSlot]);
    } else {
      setSelectedTimeSlots((prevSlots) =>
        prevSlots.filter((slot) => slot.id !== timeSlot.id)
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("values: ", values);
      const { date, doctorId, month, specialist } = form.getValues();
      const formattedDate = new Date(year, month - 1, date);
      const formattedDateString = formattedDate.toISOString();
      const newFormData = {
        patientId: session?.user.id,
        doctorId,
        organizationId: session?.user.organization?.id,
        specialist,
        dateSlots: [
          { date: formattedDateString, timeSlots: selectedTimeSlots },
        ],
      };
      console.log("newFormData: ", newFormData);

      const res = await createAppointment(axiosAuth, newFormData);

      handleApiResponse(res);
      if (res.status === 200) {
        router.push("/home/booked-appointment");
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllSpecialist();
      const allDate = generateDatesOfMonth(year, month);
      setAllDate(allDate);
    }
  }, [status]);

  useEffect(() => {
    console.log("selectedTimeSlots: ", selectedTimeSlots);
  }, [selectedTimeSlots]);

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="flex flex-col w-full h-full sm:border-[1px] sm:rounded-lg sm:px-0 py-10 sm:p-0">
          <div className="sm:flex items-center sm:bg-gradient-to-b sm:from-redLogInButton sm:to-[#FC5C7D] sm:shadow drop-shadow-md sm:drop-shadow-none px-4 py-2 text-gray-600 sm:text-white font-semibold text-2xl sm:border-b-[1px] sm:rounded-t-lg">
            <Button
              className="p-2 rounded-full shadow-none text-redLogInButton bg-white sm:bg-redLogInButton sm:text-white hover:bg-gray-200 sm:hover:text-redLogInButton"
              onClick={() => signOut()}
            >
              <div className="text-lg">
                <ArrowLeft />
              </div>
            </Button>
            <div>Booking Appointments</div>
          </div>
          {/* show all appointments */}
          <div className="flex flex-col grow px-4  py-6 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="">
                  <FormField
                    control={form.control}
                    name="specialist"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue("specialist", value);
                              fetchAllDoctor(value);
                              fetchAllTimeSlots();
                            }}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                fieldState.error ? "border-red-600" : ""
                              } `}
                            >
                              <SelectValue placeholder="Select your specialist" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {specialists?.map((specialist, id) => {
                                  return (
                                    <SelectItem
                                      key={id}
                                      value={specialist.specialist as any}
                                    >
                                      {specialist.specialist}
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
                    name="doctorId"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue("doctorId", +value);
                              fetchAllTimeSlots();
                            }}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                fieldState.error ? "border-red-600" : ""
                              } `}
                            >
                              <SelectValue placeholder="Select your doctor" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {doctors?.map((doctor, id) => {
                                  return (
                                    <SelectItem
                                      key={id}
                                      value={doctor.id.toString()}
                                    >
                                      {doctor.firstname} {doctor.lastname}
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
                    name="month"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-3 mt-4">
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue("month", +value);
                              const allDate = generateDatesOfMonth(
                                2024,
                                +value
                              );
                              setAllDate(allDate);
                              fetchAllTimeSlots();
                            }}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                fieldState.error ? "border-red-600" : ""
                              } `}
                            >
                              <SelectValue placeholder="Select your month" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {MonthConstant?.map((monthEl, id) => {
                                  return (
                                    <SelectItem
                                      key={id}
                                      value={monthEl.value.toString() as string}
                                    >
                                      {monthEl.label}
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
                    name="date"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-3 mt-8">
                        <FormControl>
                          <div className="flex flex-col space-y-4">
                            <div>Select Schedule</div>
                            <div className="flex overflow-y-auto space-x-2">
                              {allDate?.map((date, dateIdx) => {
                                return (
                                  <div
                                    key={dateIdx}
                                    className={`bg-gray-200 focus:bg-gray-200 p-3 rounded-lg text-center h-[76px] w-[76px] ${
                                      form.getValues().date == date.day
                                        ? "border-redLogInButton border-2 text-redLogInButton "
                                        : "text-black"
                                    } cursor-pointer`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      form.setValue("date", +date.day);
                                      fetchAllTimeSlots();
                                    }}
                                  >
                                    <div className="flex flex-col">
                                      <div>{date.dayOfWeek}</div>
                                      <div>{date.day}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col space-y-4 my-4 h-60 overflow-y-auto border-gray-200 border-2 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-3 ">
                      {allTimeSlot?.map((timeSlot, timeSlotIdx) => {
                        return (
                          <Button
                            key={timeSlotIdx}
                            disabled={
                              timeSlot.status === "NOT_AVAILABLE" ||
                              timeSlot.status === "BOOKED"
                            }
                            className={`bg-white focus:bg-white rounded-lg text-center py-2 border-2 cursor-pointer ${
                              selectedTimeSlots.includes(timeSlot)
                                ? "border-redLogInButton text-redLogInButton"
                                : "border-gray-200 text-black"
                            } ${
                              timeSlot.status === "BOOKED" ? "bg-green-500" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleTimeSlotSelection(timeSlot);
                            }}
                          >
                            <div className="flex flex-col">
                              <div>{timeSlot.time}</div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* time */}
                <div></div>
                <div className="mx-8 mt-10">
                  <Button className="w-full " type="submit">
                    <div className="font-semibold mr-1">Continue</div>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNewBookedAppointment;
