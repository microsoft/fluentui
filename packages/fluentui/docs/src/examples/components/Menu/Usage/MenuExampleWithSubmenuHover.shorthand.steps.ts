import { menuClassName } from '@fluentui/react-northstar';

const selectors = {
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .hover(selectors.item(1))
        .snapshot('Hovers 1st item, open menu')
        .hover(selectors.item(3))
        .snapshot('Hovers 2nd item, open submenu'),
  ],
};

export default config;
