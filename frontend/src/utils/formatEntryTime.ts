export function formatEntryTime(time: number[] | string | null): string {
  if (!time) return "Unknown time";

  let date: Date;

  if (Array.isArray(time)) {
    const [year, month, day, hour, minute] = time;
    date = new Date(year, month - 1, day, hour, minute);
  } else {
    date = new Date(time);
  }

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}