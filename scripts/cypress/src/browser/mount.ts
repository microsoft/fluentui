import { mount } from '@cypress/react';

type Mount = typeof mount;

/**
 * Custom mount function that uses React StrictMode by default
 * @param jsx
 * @param options
 */
const mountStrict: Mount = (jsx, options) => {
  const { strict = options?.strict ?? true, ...rest } = options || {};

  return mount(jsx, { strict, ...rest });
};

export { mountStrict as mount };
