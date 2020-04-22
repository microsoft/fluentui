import { buttonClassName } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${buttonClassName}[title*="Open popup"]`,
  closeButton: `.${buttonClassName}[title*="Close"]`,
};

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(selectors.triggerButton)
        .snapshot('Click on the trigger (opens popup)')
        .click(selectors.closeButton)
        .snapshot('Click on close button (closes popup)'),
  ],
};

export default config;
