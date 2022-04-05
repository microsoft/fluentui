import { toolbarClassName, toolbarItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const selectors = {
  item: (itemIndex: number) => `.${toolbarClassName} .${toolbarItemClassName}:nth-child(${itemIndex})`,
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
