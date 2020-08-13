import { BehaviorRule } from '../rules';
import { Rule } from '../types';

export const accordionBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .hasAttribute('aria-level', 3)
    .description('when the elmenet is not a header'),

  BehaviorRule.root()
    .forProps({ as: 'h1' })
    .doesNotHaveAttribute('aria-level')
    .description('when the elmenet is header'),

  BehaviorRule.slot('content').hasAttribute('role', 'button'),
  BehaviorRule.slot('content').hasAttribute('tabIndex', 0),
  BehaviorRule.slot('content')
    .hasAttribute('aria-expanded', true)
    .forProps([{ active: true }, { active: 1 }])
    .description('when the panel is active'),
];
