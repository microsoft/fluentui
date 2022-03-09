import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#message-1')
        .snapshot('Opened a popup on second message')
        .executeScript('document.querySelector("#scrollable-area").scrollTop = 50')
        .snapshot('has "[data-popper-is-intersecting]" when the popover intersects boundaries')
        .executeScript('document.querySelector("#scrollable-area").scrollTop = 80')
        .snapshot(`has "[data-popper-escaped]" when the popper escapes the reference element's boundary`)
        .executeScript('document.querySelector("#scrollable-area").scrollTop = 150')
        .snapshot('has "[data-popper-reference-hidden]" when the reference is hidden'),
  ],
};

export default config;
