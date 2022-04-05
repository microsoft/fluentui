const noop = () => undefined;

const original = { ...console };
const disabled = { log: noop, error: noop, debug: noop, warn: noop, info: noop };

let isDisabledOnce;

/**
 * Enable console logging.
 */
export const enable = () => Object.assign(console, original);

/**
 * Disable console logging.
 */
export const disable = () => Object.assign(console, disabled);

/**
 * Silence the console for a single test.  It will be re-enabled after it().
 */
export const disableOnce = () => {
  isDisabledOnce = true;
  disable();
};

afterEach(() => {
  if (isDisabledOnce) {
    isDisabledOnce = false;
    enable();
  }
});
