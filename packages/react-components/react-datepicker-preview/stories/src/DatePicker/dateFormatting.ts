export const formatDate = (date: Date): string => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const parseDate = (text: string): Date | null => {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
  if (!match) {
    return null;
  }
  const [, day, month, year] = match.map(Number);
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
};
