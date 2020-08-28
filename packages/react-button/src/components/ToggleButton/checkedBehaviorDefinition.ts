import { BehaviorRule, Rule } from '@fluentui/a11y-testing';

export const checkedBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .doesNotHaveAttribute('aria-pressed')
    .description('by default'),
  BehaviorRule.root()
    .afterEvent('onClick', [{}, {}])
    .hasAttribute('aria-pressed', 'true')
    .description('after the element has been clicked'),
  BehaviorRule.root()
    .forProps({ checked: undefined, defaultChecked: true })
    .afterEvent('onClick', [{}, {}])
    .hasAttribute('aria-pressed', 'false')
    .description('after the element has been clicked and the defaultChecked was true'),
];
