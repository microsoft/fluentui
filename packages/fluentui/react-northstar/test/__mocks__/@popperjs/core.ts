// Popper.js does not work with JSDOM: https://github.com/FezVrasta/popper.js/issues/478
export function createPopper() {
  return {
    destroy: () => {},
    update: () => {},
    setOptions: () => {},
  };
}
