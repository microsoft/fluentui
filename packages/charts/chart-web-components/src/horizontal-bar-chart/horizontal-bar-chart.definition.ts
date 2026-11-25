import { FluentDesignSystem } from '@fluentui/web-components';
import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { styles } from './horizontal-bar-chart.styles.js';
import { template } from './horizontal-bar-chart.template.js';

/**
 * The definition for the `<fluent-horizontal-bar-chart>` element.
 *
 * @public
 */
export const definition: PartialFASTElementDefinition = {
  name: `${FluentDesignSystem.prefix}-horizontal-bar-chart`,
  registry: FluentDesignSystem.registry,
  shadowOptions: {
    delegatesFocus: true,
  },
  styles,
  template,
};
