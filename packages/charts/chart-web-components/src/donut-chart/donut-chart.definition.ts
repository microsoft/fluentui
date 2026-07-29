import { FluentDesignSystem } from '@fluentui/web-components';
import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { styles } from './donut-chart.styles.js';
import { template } from './donut-chart.template.js';

/**
 * The definition for the `<fluent-donut-chart>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: `${FluentDesignSystem.prefix}-donut-chart`,
  registry: FluentDesignSystem.registry,
  shadowOptions: {
    delegatesFocus: true,
  },
  styles,
  template,
};
