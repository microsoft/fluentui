import { Rule } from '../../types';
import { BehaviorRule } from '../../rules/rules';

export const pillIconBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('aria-hidden', 'true').description(`Icon should be hidden for screen readers`),
];
