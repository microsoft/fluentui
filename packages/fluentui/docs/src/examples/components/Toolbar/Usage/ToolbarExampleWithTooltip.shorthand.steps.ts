import { Toolbar } from '@fluentui/react-northstar';

const selectors = {
  item: (itemIndex: number) =>
    `.${Toolbar.deprecated_className} .${Toolbar.Item.deprecated_className}:nth-child(${itemIndex})`,
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
