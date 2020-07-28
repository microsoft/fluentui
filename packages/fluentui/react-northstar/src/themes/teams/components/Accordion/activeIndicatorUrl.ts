export const activeIndicatorUrl = (color: string, active: boolean) => {
  return active
    ? `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' fill='${encodeURIComponent(
        color,
      )}' viewBox='8 8 16 16'%3E%3Cpath d='M16 19l3.5-4h-7z' /%3E%3C/svg%3E")`
    : `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' fill='${encodeURIComponent(
        color,
      )}' viewBox='8 8 16 16'%3E%3Cpath d='M19 16l-4-3.5v7z' /%3E%3C/svg%3E")`;
};
