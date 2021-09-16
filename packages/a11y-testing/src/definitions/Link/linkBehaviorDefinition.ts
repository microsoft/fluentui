import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const linkBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ href: '#' })
    .doesNotHaveAttribute('role')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor'.`),
  BehaviorRule.root()
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('role', 'link')
    .hasAttribute('type', 'button')
    .description(`if element does not have href and is rendered as a 'button'.`),
  BehaviorRule.root()
    .forProps({ as: 'button', href: '#' })
    .hasAttribute('role', 'link')
    .hasAttribute('type', 'button')
    .description(`if element is forced to render as a 'button' even if it has an href.`),
  BehaviorRule.root()
    .forProps({ as: 'a' })
    .doesNotHaveAttribute('role')
    .hasAttribute('tabindex', '0')
    .description(`if element is forced to render as an 'anchor' event if it does not have an href.`),
  BehaviorRule.root()
    .forProps({ disabled: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .description(`if element has href and is rendered as an 'anchor' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('disabled')
    .description(`if element does not have href and is rendered as a 'button' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element does not have href and is rendered as a 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element does not have href and is rendered as a 'button' and is disabled but focusable.`),
];
