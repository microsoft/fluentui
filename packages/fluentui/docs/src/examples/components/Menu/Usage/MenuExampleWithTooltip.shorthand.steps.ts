import { menuClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      builder
        .hover(selectors.item(1))
        .snapshot('Hovers 1st item (show tooltip)')
        .click(selectors.item(1))
        .keys(selectors.item(1), keys.rightArrow)
        .snapshot('Navigates to next item (shows tooltip)'),
  ],
};

export default config;
