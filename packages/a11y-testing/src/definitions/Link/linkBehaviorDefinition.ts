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
    .forProps({ as: 'div' })
    .hasAttribute('role', 'link')
    .hasAttribute('tabindex', '0')
    .description(`if element type is other than the defaults 'anchor' and 'button'.`),
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
    .forProps({ as: 'div', disabled: true })
    .doesNotHaveAttribute('disabled')
    .description(`if element type is other than the defaults 'anchor' and 'button' and is disabled.`),
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
