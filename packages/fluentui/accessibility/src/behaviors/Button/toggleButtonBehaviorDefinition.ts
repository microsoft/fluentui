import { BehaviorRule, Rule } from '@fluentui/a11y-testing';

export const toggleButtonBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ active: 'true' })
    .hasAttribute('aria-pressed', 'true')
    .description(`if element has active prop.`),
  BehaviorRule.root()
    .hasAttribute('aria-pressed', 'false')
    .description(`if element has no 'active' prop.`),
];
