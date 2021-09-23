/**
 * Finds and swaps a provided key for it's right to left format.
 */
export const getRTLSafeKey = (key: string, dir: 'ltr' | 'rtl') => {
  if (dir === 'rtl') {
    switch (key) {
      case 'ArrowLeft': {
        return 'ArrowRight';
      }

      case 'ArrowRight': {
        return 'ArrowLeft';
      }
    }
  }

  return key;
};
