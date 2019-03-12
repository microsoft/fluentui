import { createComponent as originalCreateComponent } from '@uifabric/foundation';
import { initializeDefaultTheme } from './Styling';

export * from '@uifabric/foundation';

/**
 * We need to ensure the default theme has been initialized before calling
 * createComponent, which depends on a theme to be provided.
 */
// tslint:disable-next-line:no-any
export const createComponent: typeof originalCreateComponent = function(...args: any[]) {
  initializeDefaultTheme();

  return originalCreateComponent.apply(this, args);
};
