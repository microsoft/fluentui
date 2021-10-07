import { Rule } from '../../types';
import { BehaviorRule } from '../../rules/rules';

export const pillOptionBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('role', 'option').description(`Pill as option`),
];
