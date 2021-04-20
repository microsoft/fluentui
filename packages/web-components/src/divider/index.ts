import { Divider, dividerTemplate as template } from '@microsoft/fast-foundation';
import { dividerStyles as styles } from './divider.styles';

/**
 * The FAST Divider Element. Implements {@link @microsoft/fast-foundation#Divider},
 * {@link @microsoft/fast-foundation#dividerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-divider\>
 */
export const fastDivider = Divider.compose({
  baseName: 'divider',
  template,
  styles,
});

/**
 * Styles for Divider
 * @public
 */
export const dividerStyles = styles;
