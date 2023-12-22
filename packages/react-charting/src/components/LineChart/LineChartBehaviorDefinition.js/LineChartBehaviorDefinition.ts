/* eslint-disable import/no-extraneous-dependencies */
import { BehaviorRule } from '@fluentui/a11y-testing/lib-commonjs/src/rules/rules';
import { Rule } from '@fluentui/a11y-testing/lib-commonjs/src/types';

export const LineChartBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ actionable: true })
    .hasAttribute('role', 'button')
    .description(`if element is actionable.`),
  BehaviorRule.root()
    .forProps({ actionable: false })
    .hasAttribute('role', 'none')
    .description(`if element is not actionable.`),
  BehaviorRule.root()
    .forProps({ selectable: true, selected: true })
    .hasAttribute('aria-selected', 'true')
    .description(`if element is selected.`),
];
