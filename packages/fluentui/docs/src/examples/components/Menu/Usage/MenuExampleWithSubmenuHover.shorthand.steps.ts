import { menuClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.item(1))
        .snapshot('Click 1st item, open menu')
        .hover(selectors.item(3))
        .snapshot('Hovers 2nd item, open submenu'),
  ],
};

export default config;
