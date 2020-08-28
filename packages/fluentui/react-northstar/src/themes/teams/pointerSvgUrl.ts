export const pointerSvgUrl = (backgroundColor: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='${encodeURIComponent(
    backgroundColor,
  )}' viewBox='0 0 6 16'%3E%3Cpath d='M.708 9.527a2.002 2.002 0 0 1 0-3.055l3.284-2.78C5.324 2.562 5.991 1.332 5.991 0c0 1.002.02 15.013 0 16 0-1.333-.665-2.562-1.995-3.689L.708 9.527z' fill-rule='evenodd' clip-rule='evenodd'/%3E%3C/svg%3E%0A");`;
