import { Rule } from '../../types';
import { BehaviorRule } from '../../rules/rules';

export const pillImageBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('aria-hidden', 'true').description(`Image should be hidden for screen readers`),
];
