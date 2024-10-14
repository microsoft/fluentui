import { FluentDesignSystem } from '../fluent-design-system.js';
import { DonutChart } from './donut-chart.js';
import { styles } from './donut-chart.styles.js';
import { template } from './donut-chart.template.js';

/**
 * @public
 * @remarks
 * HTML Element: `<fluent-donut-chart>`
 */
export const definition = DonutChart.compose({
  name: `${FluentDesignSystem.prefix}-donut-chart`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
