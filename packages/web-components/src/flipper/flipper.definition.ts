import { FluentDesignSystem } from '../fluent-design-system.js';
import { Flipper } from './flipper.js';
import { styles } from './flipper.styles.js';
import { template } from './flipper.template.js';

/**
 * Flipper web component
 * @public
 */
export const definition = Flipper.compose({
  name: `${FluentDesignSystem.prefix}-flipper`,
  styles,
  template,
});
