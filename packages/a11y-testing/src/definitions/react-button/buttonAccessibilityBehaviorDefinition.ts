import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const buttonAccessibilityBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .doesNotHaveAttribute('role')
    .doesNotHaveAttribute('tabindex')
    .description(`if element is rendered as a default 'button'.`),
  BehaviorRule.root()
    .forProps({ href: '#' })
    .hasAttribute('role', 'button')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor'.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .hasAttribute('data-is-focusable', 'true')
    .hasAttribute('role', 'button')
    .hasAttribute('tabindex', '0')
    .description(`if element type is other than the defaults 'anchor' and 'button'.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('disabled')
    .description(`if element is rendered as a default 'button' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabled: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .description(`if element has href and is rendered as an 'anchor' and is disabled.`),
  BehaviorRule.root()
    .forProps({ as: 'div', disabled: true })
    .doesNotHaveAttribute('disabled')
    .description(`if element type is other than the defaults 'anchor' and 'button' and is disabled.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element is rendered as a default 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ as: 'div', disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element type is other than the defaults 'anchor' and 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .description(`if element is rendered as a default 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ disabled: true, disabledFocusable: true, href: '#' })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element has href and is rendered as an 'anchor' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ as: 'div', disabled: true, disabledFocusable: true })
    .doesNotHaveAttribute('disabled')
    .hasAttribute('aria-disabled', 'true')
    .hasAttribute('tabindex', '0')
    .description(`if element type is other than the defaults 'anchor' and 'button' and is disabled but focusable.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .pressSpaceKey()
    .verifyOnclickExecution()
    .description(`if element type is other than the defaults 'anchor' and 'button'.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .pressEnterKey()
    .verifyOnclickExecution()
    .description(`if element type is other than the defaults 'anchor' and 'button'.`),
];
