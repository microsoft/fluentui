export const getEventTarget = (event: Event): HTMLElement | null => {
  let target = event.target as HTMLElement;
  if (target && target.shadowRoot) {
    target = event.composedPath()[0] as HTMLElement;
  }

  return target;
};
