import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const buttonBehaviorDefinition: Rule[] = [
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .hasAttribute('role', 'button')
    .description(`if element type is other than 'button'.`),
  BehaviorRule.root()
    .doesNotHaveAttribute('role')
    .description(`if element is native button.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .hasAttribute('tabindex', '0')
    .description(`if element type is other than 'button'.`),
  BehaviorRule.root()
    .doesNotHaveAttribute('tabindex')
    .description(`if element is native 'button'.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('disabled')
    .description(`based on 'disabled' prop when element is native 'button'.`),
  BehaviorRule.root()
    .forProps({ disabled: true, as: 'div' })
    .doesNotHaveAttribute('disabled')
    .description(`if element is NOT native 'button'.`),
  BehaviorRule.root()
    .forProps({ disabled: true, loading: true })
    .doesNotHaveAttribute('disabled')
    .description(`if element is loading.`),
  BehaviorRule.root()
    .forProps({ disabled: true })
    .hasAttribute('aria-disabled', 'true')
    .description(`if property 'disabled' is 'true'.`),
  BehaviorRule.root()
    .forProps({ loading: true })
    .hasAttribute('aria-disabled', 'true')
    .description(`if property 'aria-disabled' is 'true'.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .pressSpaceKey()
    .verifyOnclickExecution()
    .description(`when element is not native 'button' or 'link'.`),
  BehaviorRule.root()
    .forProps({ as: 'div' })
    .pressEnterKey()
    .verifyOnclickExecution()
    .description(`when element is not native 'button' or 'link'.`),
];
