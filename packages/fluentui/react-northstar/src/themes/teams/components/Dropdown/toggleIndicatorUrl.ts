export default (color: string) =>
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' fill='${encodeURIComponent(
    color,
  )}' focusable='false' viewBox='8 8 16 16'%3E%3Cpath d='M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z' /%3E%3C/svg%3E")`;
