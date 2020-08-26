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
        .click(selectors.item(1))
        .snapshot('Hovers 1st item, open menu and kep it open on click')
        .hover(selectors.item(2))
        .snapshot('Hovers 2nd item, open submenu'),
  ],
};

export default config;
