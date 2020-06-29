import { menuClassName } from '@fluentui/react-northstar';
import getScreenerSteps from '../commonScreenerSteps';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
  lastItem: `.${menuClassName} li:last-child a`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      getScreenerSteps({ startItem: 2, endItem: 4 })[0](builder, keys)
        .click(selectors.lastItem)
        .snapshot('Clicks on the last item and opens submenu')

        .keys(selectors.lastItem, keys.downArrow)
        .snapshot('Focuses on the first element in the submenu'),
  ],
};

export default config;
