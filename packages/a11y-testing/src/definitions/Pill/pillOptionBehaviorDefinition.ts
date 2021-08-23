import { BehaviorRule } from '../../rules/rules';
import type { Rule } from '../../types';

export const pillOptionBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('role', 'option').description(`Pill as option`),
];
