import { buttonClassName } from '@fluentui/react-northstar';

const selectors = {
  triggerButtonPopupWithTrapFocus: `.${buttonClassName}[title*="PopupWithTrapFocus"]`,
  triggerButtonControlledPopupWithFocus: `.${buttonClassName}[title*="ControlledPopupWithFocus"]`,
};

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .focus(selectors.triggerButtonPopupWithTrapFocus)
        .snapshot('Scroll to trigger button for popup with trap focus')
        .click(selectors.triggerButtonPopupWithTrapFocus)
        .snapshot('Click on trigger button for popup with trap focus')
        // hide first popup
        .click('body')
        .focus(selectors.triggerButtonControlledPopupWithFocus)
        .snapshot('Scroll to trigger button for controlled popup with manual focus')
        .click(selectors.triggerButtonControlledPopupWithFocus)
        .snapshot('Click on trigger button for controlled popup with manual focus'),
  ],
};

export default config;
