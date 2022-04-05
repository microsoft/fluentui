import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const pillActionBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('role', 'presentation').description(`Action is presentational`),
  BehaviorRule.root().hasAttribute('aria-hidden', 'true').description(`Action should be hidden from screener`),
];
