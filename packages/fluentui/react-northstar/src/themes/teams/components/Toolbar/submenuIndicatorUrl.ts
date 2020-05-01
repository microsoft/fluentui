export default (color: string) => {
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' fill='${encodeURIComponent(
    color,
  )}' focusable='false' viewBox='8 8 16 16'%3E%3Cpath d='M19.49,16a.91.91,0,0,1-.29.7l-5,5a1,1,0,0,1-.71.3,1,1,0,0,1-1-1,1,1,0,0,1,.29-.7L17.08,16l-4.3-4.29a1,1,0,0,1-.29-.71,1,1,0,0,1,1.71-.71l5,5A1,1,0,0,1,19.49,16Z' /%3E%3C/svg%3E")`;
};
