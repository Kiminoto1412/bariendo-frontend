interface ITimeSlot {
  id: number;
  time: string;
}

interface IDateSlot {
  id: number;
  date: string;
  timeSlots: ITimeSlot[];
}

interface IDoctor {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  specialist: string;
  role: string;
}

interface IPatient {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  specialist: string;
  role: string;
}

interface IOrganization {
  id: number;
  name: string;
}

export interface IAppointments {
  id: number;
  dateSlots: IDateSlot[];
  doctor: IDoctor;
  patient: IPatient;
  organization: IOrganization;
}
