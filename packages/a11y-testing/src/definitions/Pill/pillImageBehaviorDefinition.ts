import { BehaviorRule } from '../../rules/rules';
import type { Rule } from '../../types';

export const pillImageBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('aria-hidden', 'true').description(`Image should be hidden for screen readers`),
];
