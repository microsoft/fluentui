import { Divider, dividerTemplate as template } from '@microsoft/fast-foundation';
import { dividerStyles as styles } from './divider.styles';

/**
 * The Fluent Divider Element. Implements {@link @microsoft/fast-foundation#Divider},
 * {@link @microsoft/fast-foundation#dividerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-divider\>
 */
export const fluentDivider = Divider.compose({
  baseName: 'divider',
  template,
  styles,
});

/**
 * Styles for Divider
 * @public
 */
export const dividerStyles = styles;

/**
 * Base class for Fluent Divider
 * @public
 */
export { Divider };
