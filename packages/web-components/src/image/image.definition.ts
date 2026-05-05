import { tagName } from './image.options.js';
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
  name: tagName,
  template,
  styles,
});
