import { BehaviorRule, Rule } from '@fluentui/a11y-testing';

export const buttonGroupBehaviorDefinition: Rule[] = [BehaviorRule.root().hasAttribute('role', 'group')];
