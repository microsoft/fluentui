import { FluentDesignSystem } from '../fluent-design-system.js';
import { Image } from './image.js';
import { template } from './image.template.js';
import { styles } from './image.styles.js';

/**
 * The Fluent Image Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-image\>
 */
export const definition = Image.compose({
  name: `${FluentDesignSystem.prefix}-image`,
  template,
  styles,
});
