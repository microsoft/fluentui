import { Checkbox } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
        .snapshot('Overflow item is properly positioned'),

    builder =>
      builder
        .wait(1000) // wait till overflow will be executed
        .click(`.${Checkbox.className}`)
        .wait(1000) // wait till overflow will be executed
        .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
        .snapshot('RTL: Overflow item is properly positioned'),
  ],
};

export default config;
