import { FluentDesignSystem } from '@fluentui/web-components';
import { HorizontalBarChart } from './horizontal-bar-chart.js';
import { styles } from './horizontal-bar-chart.styles.js';
import { template } from './horizontal-bar-chart.template.js';

/**
 * The Fluent Textarea Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-textarea>`
 */
export const definition = HorizontalBarChart.compose({
  name: `${FluentDesignSystem.prefix}-horizontal-bar-chart`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
