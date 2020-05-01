export default (color: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='6.5 6.5 19 19'%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
    color,
  )}' d='M12.5 22V10h1v12h-1zM18.5 22V10h1v12h-1z' /%3E%3C/g%3E%3C/svg%3E")`;
