export function createSafeZoneAreaStateStore(): {
  isActive: () => boolean;
  toggleActive: (newIsActive: boolean) => void;
  subscribe: (listener: (value: boolean) => void) => () => void;
} {
  let isActive = false;
  const listeners: ((value: boolean) => void)[] = [];

  return {
    isActive() {
      return isActive;
    },
    toggleActive(newIsActive: boolean) {
      if (isActive === newIsActive) {
        return;
      }

      isActive = newIsActive;
      listeners.forEach(listener => listener(isActive));
    },

    subscribe(listener: (value: boolean) => void) {
      listeners.push(listener);

      return () => {
        const index = listeners.indexOf(listener);

        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };
}
