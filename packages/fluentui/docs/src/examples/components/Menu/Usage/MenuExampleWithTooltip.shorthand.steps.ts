import { Menu } from '@fluentui/react-northstar';

const selectors = {
  menu: `.${Menu.deprecated_className}`,
  item: (itemIndex: number) => `.${Menu.deprecated_className} li:nth-child(${itemIndex}) a`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
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
