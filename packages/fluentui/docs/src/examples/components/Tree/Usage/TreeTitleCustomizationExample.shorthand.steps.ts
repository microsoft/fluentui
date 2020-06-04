import { treeItemClassName, treeTitleSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  treeItem: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex})`,
  selectionIndicator: (itemIndex: number) =>
    `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleSlotClassNames.indicator}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(selectors.treeItem(1))
        .click(selectors.treeItem(2))
        .snapshot('Expanded'),
  ],
};

export default config;
