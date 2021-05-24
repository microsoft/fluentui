import { Rule } from '../../types';
import { BehaviorRule } from '../../rules/rules';

export const pillGroupBehaviorDefinition: Rule[] = [
  BehaviorRule.root().hasAttribute('role', 'listbox').description(`PillGroup as listbox`),
];
