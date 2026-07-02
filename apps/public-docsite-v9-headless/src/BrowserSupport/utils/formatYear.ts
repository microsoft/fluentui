export function formatYear(date: string | null): string {
  return date ? date.split('-')[0] : '';
}
