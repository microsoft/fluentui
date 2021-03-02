import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const popupBehaviorDefinitionTriggerSlotNotTabbable: Rule[] = [
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .hasAttribute('tabIndex', '0')
    .hasAttribute('aria-haspopup', 'dialog'),
  BehaviorRule.slot('trigger').forProps({ tabbableTrigger: true }).hasAttribute('tabIndex', '0'),
  BehaviorRule.slot('trigger').forProps({ tabbableTrigger: false }).doesNotHaveAttribute('tabIndex'),
  BehaviorRule.slot('trigger').forProps({ tabbableTrigger: false }).doesNotHaveAttribute('aria-haspopup'),
];

export const popupBehaviorDefinitionTriggerSlotTabbable: Rule[] = [
  BehaviorRule.slot('trigger').forProps({ tabbableTrigger: true }).hasAttribute('aria-haspopup', 'dialog').hide(),
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .doesNotHaveAttribute('tabIndex')
    .description(`if it is 'tabbable' and 'tabbableTrigger' is 'true'.`),
];

export const popupBehaviorDefinitionTriggerSlotWithTabIndex: Rule[] = [
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .hasAttribute('tabIndex', '-1')
    .description(`if current 'trigger' element has 'tabindex=-1' and 'tabbableTrigger' is 'true'.`),
];

export const popupBehaviorDefinitionPopupSlot: Rule[] = [
  BehaviorRule.slot('popup').forProps({ trapFocus: true }).hasAttribute('role', 'dialog'),
  BehaviorRule.slot('popup')
    .forProps({ trapFocus: true })
    .hasAttribute('aria-modal', 'true')
    .description(`if 'trapFocus' is 'true'.`),
  BehaviorRule.slot('popup')
    .forProps({ trapFocus: false })
    .hasAttribute('role', 'complementary')
    .description(`if 'trapFocus' is 'false'.`),
  BehaviorRule.slot('popup')
    .forProps({ trapFocus: false })
    .doesNotHaveAttribute('aria-modal')
    .description(`if 'trapFocus' is 'false'.`),
  BehaviorRule.slot('popup')
    .forProps({ inline: true })
    .doesNotHaveAttribute('role')
    .description(`if 'inline' is 'true'.`),
];

export const popupBehaviorDefinition = popupBehaviorDefinitionTriggerSlotNotTabbable
  .concat(popupBehaviorDefinitionTriggerSlotTabbable)
  .concat(popupBehaviorDefinitionTriggerSlotWithTabIndex)
  .concat(popupBehaviorDefinitionPopupSlot);
