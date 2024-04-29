import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const buttonGroupBehaviorDefinition: Rule[] = [BehaviorRule.root().hasAttribute('role', 'group')];
