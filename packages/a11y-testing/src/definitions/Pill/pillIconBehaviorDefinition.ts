import { BehaviorRule } from '../../rules/rules';
import type { Rule } from '../../types';

export const pillIconBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('aria-hidden', 'true').description(`Icon should be hidden for screen readers`),
];
