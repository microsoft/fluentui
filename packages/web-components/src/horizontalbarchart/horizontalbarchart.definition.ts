import { FluentDesignSystem } from '../fluent-design-system.js';
import { HorizontalBarChart } from './horizontalbarchart.js';
import { styles } from './horizontalbarchart.styles.js';
import { template } from './horizontalbarchart.template.js';

/**
 * The Fluent Textarea Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-textarea>`
 */
export const definition = HorizontalBarChart.compose({
  name: `${FluentDesignSystem.prefix}-horizontalbarchart`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
