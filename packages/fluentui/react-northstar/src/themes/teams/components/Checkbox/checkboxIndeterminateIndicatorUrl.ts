export const checkboxIndicatorIndeterminateUrl = (color: string, backgroundColor: string) =>
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' style='background-color: ${escape(
    backgroundColor,
  )}; padding: 2px;' focusable='false' viewBox='8 8 22.5 22.5'%3E%3Cg%3E%3Cpath fill='${escape(
    color,
  )}' d='M10 16v-1h12v1H10z 11.875a.968.968 0 0 1-.289.711l-8.25 8.25c-.192.193-.43.289-.711.289s-.519-.096-.711-.289l-4.75-4.75a.965.965 0 0 1-.289-.711c0-.125.027-.25.082-.375s.129-.234.223-.328a.953.953 0 0 1 .695-.297c.135 0 .266.025.391.074.125.05.231.121.32.215l4.039 4.047 7.539-7.547a.886.886 0 0 1 .32-.215c.125-.049.255-.074.391-.074a1.004 1.004 0 0 1 .922.625.97.97 0 0 1 .078.375z' /%3E%3C/g%3E%3C/svg%3E")`;
