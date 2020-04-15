import { attachmentClassName, attachmentSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  root: `.${attachmentClassName}`,
  action: `.${attachmentSlotClassNames.action}`,
};

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(selectors.root).snapshot('Hovers root'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses root'),

  builder => builder.hover(selectors.action).snapshot('Hovers action'),
  (builder, keys) =>
    builder
      .keys('body', keys.tab)
      .keys('body', keys.tab)
      .snapshot('Focuses action'),
];

export default getScreenerSteps;
