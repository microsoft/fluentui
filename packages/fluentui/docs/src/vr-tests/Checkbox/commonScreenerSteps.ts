// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'screener-storybook/src/screener';
import { checkboxClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities';

const screenerSteps = new Steps()
  .click(`.${checkboxClassName}`)
  .snapshot('Checks checkbox')
  .keys('body', keys.tab)
  .snapshot('Focuses checkbox')
  .end();

export default screenerSteps;
