import { menuClassName } from '@fluentui/react-northstar';
import getScreenerSteps from '../commonScreenerSteps';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
  lastItem: `.${menuClassName} li:last-child a`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      /*
      getScreenerSteps
      3rd item is disabled therefore:
      - navigate from second to disabled item, to verify outline on disabled
      - navigate from 5th item to 4th, to verify outline on common item
      */
      getScreenerSteps({ startItem: 2, endItem: 5 })[0](builder, keys)
        .click(selectors.lastItem)
        .snapshot('Clicks on the last item and opens submenu')

        .keys(selectors.lastItem, keys.downArrow)
        .snapshot('Focuses on the first element in the submenu'),
  ],
};

export default config;
