import { Menu } from '@fluentui/react-northstar';
import getScreenerSteps from '../commonScreenerSteps';

const selectors = {
  menu: `.${Menu.deprecated_className}`,
  item: (itemIndex: number) => `.${Menu.deprecated_className} li:nth-child(${itemIndex}) a`,
  lastItem: `.${Menu.deprecated_className} li:last-child a`,
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
