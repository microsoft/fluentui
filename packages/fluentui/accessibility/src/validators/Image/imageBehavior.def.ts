import { BehaviorRule } from '../rules';
import { Rule } from '../types';

export const imageBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .hasAttribute('aria-hidden', 'true')
    .description("when the element doesn't have alt or aria-label"),

  BehaviorRule.root()
    .forProps({ alt: 'test' })
    .doesNotHaveAttribute('aria-hidden')
    .description('when the element has an alt property'),

  BehaviorRule.root()
    .forProps({ 'aria-label': 'test' })
    .doesNotHaveAttribute('aria-hidden')
    .description('when the element has an aria-label property'),
];
