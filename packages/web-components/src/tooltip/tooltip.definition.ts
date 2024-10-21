import { FluentDesignSystem } from '../fluent-design-system.js';
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
  name: `${FluentDesignSystem.prefix}-tooltip`,
  template,
  styles,
});
