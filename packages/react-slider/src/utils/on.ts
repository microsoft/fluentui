// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};
