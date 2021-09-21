export const on = <T>(
  element: Element | Window | Document,
  eventName: string,
  callback: (ev: T) => void,
  options?: boolean,
) => {
  element.addEventListener(eventName, (callback as unknown) as (ev: Event) => void, options);
  return () => element.removeEventListener(eventName, (callback as unknown) as (ev: Event) => void, options);
};
