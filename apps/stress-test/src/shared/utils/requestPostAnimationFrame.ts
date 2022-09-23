export const requestPostAnimationFrame = (callback: Function): void => {
  requestAnimationFrame(() => {
    addEventListener('message', _ => callback(), { once: true });
    postMessage('', '*');
  });
};
