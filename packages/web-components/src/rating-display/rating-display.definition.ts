import { FluentDesignSystem } from '../fluent-design-system.js';
import { RatingDisplay } from './rating-display.js';
import { styles } from './rating-display.styles.js';
import { template } from './rating-display.template.js';

/**
 * The definition for the Fluent Rating Display component.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-rating-display>`
 */
export const definition = RatingDisplay.compose({
  name: `${FluentDesignSystem.prefix}-rating-display`,
  template,
  styles,
});
