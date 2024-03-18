export function formatDateValue(value: any): string {
  if (value instanceof Date) {
    return value.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return String(value);
}

export function formatEngDateValue(rawDate: any): string {
  const dateObj = new Date(rawDate);
  const formattedDate = dateObj.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

export function formatThaiDateValue(rawDate: any): string {
  const dateObj = new Date(rawDate);
  const formattedDate = dateObj.toLocaleString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

export function formatThaiTimeValue(rawDate: any): string {
  const dateObj = new Date(rawDate);
  // Format time as "HH:mm"
  const formattedTime = dateObj.toLocaleString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });
  return formattedTime;
}

export const convertTo12HourFormat = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12; // Convert 0 to 12
  return `${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${ampm}`;
};

export const formatDateToCustomFormat = (dateString: string | Date): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const generateDatesOfMonth = (year: number, month: number) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const numDays = new Date(year, month, 0).getDate();
  const dates = [];

  for (let day = 1; day <= numDays; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    if (
      year > currentYear ||
      (year === currentYear && month > currentMonth) ||
      (year === currentYear && month === currentMonth && day >= currentDate)
    ) {
      dates.push({ day, dayOfWeek });
    }
  }
  return dates;
};
