import { Rule } from './../../types';
import { BehaviorRule } from './../../rules/rules';

export const popupBehaviorDefinitionTriggerSlotNotTabbable: Rule[] = [
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .hasAttribute('tabIndex', '0')
    .hasAttribute('aria-haspopup', 'dialog')
    .description(`if 'tabbableTrigger' is 'true'.`),
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .hasAttribute('tabIndex', '0')
    .description(`if it is 'not tabbable' and 'tabbableTrigger' is 'true'.`),
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: false })
    .doesNotHaveAttribute('tabIndex')
    .description(`if 'tabbableTrigger' is 'false'.`),
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: false })
    .doesNotHaveAttribute('aria-haspopup')
    .description(`if 'tabbableTrigger' is 'false'.`),
];

export const popupBehaviorDefinitionTriggerSlotTabbable: Rule[] = [
  BehaviorRule.slot('trigger')
    .forProps({ tabbableTrigger: true })
    .hasAttribute('aria-haspopup', 'dialog')
    .description(`if 'tabbableTrigger' is 'true'.`),
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
  BehaviorRule.slot('popup')
    .forProps({ trapFocus: true })
    .hasAttribute('role', 'dialog')
    .description(`if 'trapFocus' is 'true'.`),
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
];

// remove 'definition' which contains 'dialog' rule because description is already cover in popupBehaviorDefinitionTriggerSlotNotTabbable
// just want to keep 'definition' in the array, in order to test 'tabbable' and 'notTabbable' trigger
const modifiedForDocumentation = popupBehaviorDefinitionTriggerSlotTabbable.filter(
  definition => definition.stringify().search('dialog') === -1,
);

export const popupBehaviorDefinition = popupBehaviorDefinitionTriggerSlotNotTabbable
  .concat(modifiedForDocumentation)
  .concat(popupBehaviorDefinitionTriggerSlotWithTabIndex)
  .concat(popupBehaviorDefinitionPopupSlot);
