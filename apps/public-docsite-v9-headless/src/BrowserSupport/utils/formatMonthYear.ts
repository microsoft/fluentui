import { MONTHS } from '../constants';

export function formatMonthYear(date: string | null): string {
  if (!date) {
    return '';
  }

  const [year, month] = date.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
