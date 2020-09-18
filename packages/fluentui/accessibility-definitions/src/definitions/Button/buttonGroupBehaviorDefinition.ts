import { BehaviorRule, Rule } from '@fluentui/a11y-rules';

export const buttonGroupBehaviorDefinition: Rule[] = [BehaviorRule.root().hasAttribute('role', 'group')];
