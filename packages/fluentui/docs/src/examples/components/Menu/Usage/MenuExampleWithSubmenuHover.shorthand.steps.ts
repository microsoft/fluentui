import { menuClassName } from '@fluentui/react-northstar';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .hover(selectors.item(1))
        .snapshot('Hovers 1st item, open menu')
        .hover(selectors.item(5))
        .snapshot('Hovers 2nd, close hovered')
        .hover(selectors.item(1))
        .snapshot('Hovers 1st item, open menu')
        .click(selectors.item(1))
        .hover(selectors.item(5))
        .snapshot('Hovers 2nd item, 1st menu keep opened'),
  ],
};

export default config;
