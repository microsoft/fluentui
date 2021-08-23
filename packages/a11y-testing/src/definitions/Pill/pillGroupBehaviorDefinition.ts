import { BehaviorRule } from '../../rules/rules';
import type { Rule } from '../../types';

export const pillGroupBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('role', 'listbox').description(`PillGroup as listbox`),
];
