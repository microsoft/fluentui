import { tagName } from './slider.options.js';
import { Slider } from './slider.js';
import { styles } from './slider.styles.js';
import { template } from './slider.template.js';

/**
 * The Fluent Slider Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider\>
 */
export const definition = Slider.compose({
  name: tagName,
  template,
  styles,
});
