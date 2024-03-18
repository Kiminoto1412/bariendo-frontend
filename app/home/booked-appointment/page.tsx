"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useLoading } from "@/stores/use-loading-store";
import SpinnerLoading from "@/components/Loading/Spinner";
import { handleError } from "@/middlewares/errorMiddleware";
import { LogOut, Plus } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getAllByPatientId } from "@/api/appointment/appointmentApi";
import { IAppointments } from "@/interface/appointment";
import { useSession } from "next-auth/react";
import {
  convertTo12HourFormat,
  formatDateToCustomFormat,
} from "@/utils/DateFormat";
import { signOut } from "next-auth/react";

function BookedAppointment() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const axiosAuth = useAxiosAuth();
  const { isLoading, setIsLoading } = useLoading();
  const [appointments, setAppointmennts] = useState<IAppointments[]>([]);
  const fetchAllAppointmentByPatient = async () => {
    try {
      const res = await getAllByPatientId(axiosAuth, {
        organizationId: session?.user.organization?.id,
      });
      setAppointmennts(res.data.payload);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAllAppointmentByPatient();
    }
  }, [status]);

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="flex flex-col w-full h-full sm:border-[1px] sm:rounded-lg sm:px-0 py-10 sm:p-0">
          <div className="flex justify-between items-center sm:bg-gradient-to-b sm:from-redLogInButton sm:to-[#FC5C7D] sm:shadow drop-shadow-md sm:drop-shadow-none px-4 py-2 text-gray-600 sm:text-white font-semibold text-2xl sm:border-b-[1px] sm:rounded-t-lg">
            Booked Appointments
            <Button
              className="p-2 rounded-full shadow-none text-redLogInButton bg-white sm:bg-redLogInButton sm:text-white hover:bg-gray-200 sm:hover:text-redLogInButton"
              onClick={() => signOut()}
            >
              <div className="text-lg">
                <LogOut />
              </div>
            </Button>
          </div>
          {/* show all appointments */}
          <div className="flex flex-col grow  py-6 space-y-4">
            {/* Day */}
            {appointments.map((appointment, appointmentId) => {
              return (
                <div key={appointmentId} className="grow font-semibold">
                  {appointment.dateSlots.map((dateSlot, dateSlotId) => {
                    const isToday = (formattedDate: string): boolean => {
                      const today = new Date();
                      const formattedToday = formatDateToCustomFormat(today); // Format today's date
                      return formattedDate === formattedToday;
                    };

                    const renderDate = (formattedDate: string): string => {
                      return isToday(formattedDate) ? "Today" : formattedDate;
                    };
                    return (
                      <>
                        <div
                          key={dateSlotId}
                          className="bg-gray-200 text-center py-1 text-sm"
                        >
                          {renderDate(formatDateToCustomFormat(dateSlot.date))}
                        </div>
                        {/* reserved */}
                        <div className="p-4">
                          {dateSlot.timeSlots.map((timeSlot, timeSlotId) => {
                            return (
                              <div
                                key={timeSlotId}
                                className="bg-white pb-4 flex flex-col gap-y-2"
                              >
                                <div className="bg-gray-200 grid grid-cols-2 gap-2 rounded-md p-3">
                                  <div>
                                    {appointment.doctor.firstname}{" "}
                                    {appointment.doctor.lastname}
                                  </div>
                                  <div className="text-right">
                                    {convertTo12HourFormat(timeSlot.time)}
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    {appointment.doctor.specialist}
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <FaMapMarkerAlt
                                      className="w-5 h-5 mr-1"
                                      fill="red"
                                    />
                                    {appointment.organization.name}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            })}

            <div className="mx-8">
              <Button
                className="w-full flex items-center "
                onClick={() => router.push("booked-appointment/add-new")}
              >
                <Plus className="w-4 h-4" />
                <div className="font-semibold mr-1">Booking Appointment</div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookedAppointment;
