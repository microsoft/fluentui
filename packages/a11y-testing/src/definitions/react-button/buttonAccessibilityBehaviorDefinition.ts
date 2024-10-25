import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const buttonAccessibilityBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .doesNotHaveAttribute('role')
    .doesNotHaveAttribute('tabindex')
    .description(`if element is rendered as a default 'button'.`),
  BehaviorRule.root()
    .forProps({ as: 'a', href: '#' })
    .doesNotHaveAttribute('role')
    .doesNotHaveAttribute('tabindex')
    .doesNotHaveAttribute('type')
    .description(`if element has href and is rendered as an 'anchor'.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('disabled')
    .description(`if element is rendered as a default 'button' and is disabled.`),
  BehaviorRule.root()
    .forProps({ as: 'a', disabled: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('role', 'link')
    .description(`if element has href and is rendered as an 'anchor' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element is rendered as a default 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ as: 'a', disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element is rendered as a default 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ as: 'a', disabled: true, disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
];
