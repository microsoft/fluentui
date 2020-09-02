export const toggleIndicatorUrl = (color: string, outline: boolean) => {
  if (outline) {
    return `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 16 16'%3E%3Cpath fill='${encodeURIComponent(
      color,
    )}' d='M21.5,13.5c0,0.1,0,0.3-0.1,0.4l-5,5C16.3,19,16.1,19,16,19c-0.1,0-0.3-0.1-0.4-0.1l-5-5c-0.1-0.1-0.2-0.2-0.1-0.4 c0-0.3,0.2-0.5,0.5-0.5c0.1,0,0.3,0.1,0.4,0.1l4.6,4.6l4.7-4.6c0.1-0.1,0.2-0.1,0.4-0.1C21.3,13,21.5,13.2,21.5,13.5z' /%3E%3C/svg%3E")`;
  }

  return `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 16 16'%3E%3Cpath fill='${encodeURIComponent(
    color,
  )}' d='M16,19.5c-0.3,0-0.5-0.1-0.7-0.3l-5-5C10.1,14,10,13.8,10,13.5c0-0.6,0.4-1,1-1c0.3,0,0.5,0.1,0.7,0.3l4.3,4.3l4.3-4.3 c0.2-0.2,0.4-0.3,0.7-0.3c0.6,0,1,0.4,1,1c0,0.3-0.1,0.5-0.3,0.7l-5,5C16.5,19.4,16.3,19.5,16,19.5z' /%3E%3C/svg%3E")`;
};
