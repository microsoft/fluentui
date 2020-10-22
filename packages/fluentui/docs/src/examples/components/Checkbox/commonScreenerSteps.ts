import { checkboxClassName } from '@fluentui/react-northstar';
import { ScreenerSteps } from '@fluentui/scripts/screener';

const getScreenerSteps = (): ScreenerSteps => [
  builder => builder.click(`.${checkboxClassName}`).snapshot('Checks checkbox'),
  (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses checkbox'),
];

export default getScreenerSteps;
