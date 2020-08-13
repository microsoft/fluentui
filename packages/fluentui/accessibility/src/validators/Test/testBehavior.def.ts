import { BehaviorRule } from '../rules';
import { Rule } from '../types';

export const testBehaviorDefinition: Rule[] = [
  BehaviorRule.slot('content')
    .forProps({ contentLabel: 'test' })
    .hasAttribute('aria-label', 'test')
    .description('when the contentLabel is set'),

  BehaviorRule.slot('content')
    .hasAttribute('aria-label', 'none')
    .description('when the contentLabel is not set'),
];
