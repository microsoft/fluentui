import { tagName } from './tooltip.options.js';
import { Tooltip } from './tooltip.js';
import { styles } from './tooltip.styles.js';
import { template } from './tooltip.template.js';

/**
 * The {@link Tooltip } custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-tooltip>`
 */
export const definition = Tooltip.compose({
  name: tagName,
  template,
  styles,
});
