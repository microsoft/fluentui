export const pauseIndicatorUrl = (color: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
    color,
  )}' d='M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609Z' /%3E%3Cpath fill='${encodeURIComponent(
    color,
  )}' d='M14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z' /%3E%3C/g%3E%3C/svg%3E")`;
