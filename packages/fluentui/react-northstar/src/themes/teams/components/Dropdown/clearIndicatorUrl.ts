export default (color: string) =>
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' fill='${encodeURIComponent(
    color,
  )}' focusable='false' viewBox='8 8 16 16'%3E%3Cg%3E%3Cpath d='M17.414 16l3.89-3.89a1 1 0 1 0-1.415-1.413L16 14.586l-3.89-3.89a1 1 0 1 0-1.413 1.415L14.586 16l-3.89 3.89a1 1 0 1 0 1.415 1.413L16 17.414l3.89 3.89a.997.997 0 0 0 1.413 0 1 1 0 0 0 0-1.415L17.414 16z' /%3E%3C/g%3E%3C/svg%3E")`;
