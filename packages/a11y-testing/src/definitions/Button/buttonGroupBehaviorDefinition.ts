import { BehaviorRule } from './../../rules/rules';
import type { Rule } from './../../types';

export const buttonGroupBehaviorDefinition: Rule[] = [BehaviorRule.root().hasAttribute('role', 'group')];
