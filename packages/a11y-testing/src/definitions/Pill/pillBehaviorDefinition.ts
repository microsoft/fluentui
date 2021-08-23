import { BehaviorRule } from './../../rules/rules';
import type { Rule } from './../../types';

export const pillBehaviorDefinition: Rule[] = [
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
