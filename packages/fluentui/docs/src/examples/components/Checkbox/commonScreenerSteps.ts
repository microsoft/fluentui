import { checkboxClassName } from '@fluentui/react-northstar';

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(`.${checkboxClassName}`).snapshot('Checks checkbox'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses checkbox'),
];

export default getScreenerSteps;
