export const initPolyfills = () => {
  const w = window as any;
  w.global = w;
};
