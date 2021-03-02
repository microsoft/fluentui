import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';
import { buttonBehaviorDefinition } from './buttonBehaviorDefinition';

export const toggleButtonBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ active: 'true', checked: true })
    .hasAttribute('aria-pressed', 'true')
    .description(`if element has active/checked prop.`),
  BehaviorRule.root().hasAttribute('aria-pressed', 'false').description(`if element has no 'active/checked' prop.`),
  ...buttonBehaviorDefinition,
];
