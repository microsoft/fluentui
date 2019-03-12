import './version';
import { styled as originalStyled, customizable as originalCustomizable } from '@uifabric/utilities';
import { initializeDefaultTheme } from './Styling';

export * from '@uifabric/utilities';

/**
 * We need to ensure the default theme has been initialized before calling
 * styled, which depends on a theme to be provided.
 */
// tslint:disable-next-line:no-any
export const styled: typeof originalStyled = function(...args: any[]) {
  initializeDefaultTheme();

  return originalStyled.apply(this, args);
};

/**
 * We need to ensure the default theme has been initialized before calling
 * customizable, which depends on a theme to be provided.
 */
// tslint:disable-next-line:no-any
export const customizable: typeof originalCustomizable = function(...args: any[]) {
  initializeDefaultTheme();

  return originalCustomizable.apply(this, args);
};
