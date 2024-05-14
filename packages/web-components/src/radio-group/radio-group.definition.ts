import { FluentDesignSystem } from '../fluent-design-system.js';
import { RadioGroup } from './radio-group.js';
import { styles } from './radio-group.styles.js';
import { template } from './radio-group.template.js';

/**
 * The Fluent RadioGroup Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio-group\>
 */
export const definition = RadioGroup.compose({
  name: `${FluentDesignSystem.prefix}-radio-group`,
  template,
  styles,
});
