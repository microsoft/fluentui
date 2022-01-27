import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const linkBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ href: '#' })
    .doesNotHaveAttribute('role')
    .hasAttribute('href', '#')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor'.`),
  BehaviorRule.root()
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('type', 'button')
    .description(`if element does not have href and is rendered as a 'button'.`),
  BehaviorRule.root()
    .forProps({ as: 'button', href: '#' })
    .doesNotHaveAttribute('href')
    .hasAttribute('type', 'button')
    .description(`if element is forced to render as a 'button' even if it was passed an href.`),
  BehaviorRule.root()
    .forProps({ as: 'a' })
    .doesNotHaveAttribute('role')
    .hasAttribute('tabindex', '0')
    .description(`if element is forced to render as an 'anchor' event if it does not have an href.`),
  BehaviorRule.root()
    .forProps({ disabled: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('role', 'link')
    .description(`if element has href and is rendered as an 'anchor' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('disabled', 'true')
    .hasAttribute('type', 'button')
    .description(`if element does not have href and is rendered as a 'button' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('role', 'link')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('type', 'button')
    .description(`if element does not have href and is rendered as a 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('href')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('role', 'link')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .doesNotHaveAttribute('tabindex')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('type', 'button')
    .description(`if element does not have href and is rendered as a 'button' and is disabled but focusable.`),
];
