// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'storywright';
import { checkboxClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities';

const StoryWrightSteps = new Steps()
  .click(`.${checkboxClassName}`)
  .snapshot('Checks checkbox')
  .keys('body', keys.tab)
  .snapshot('Focuses checkbox')
  .end();

export default StoryWrightSteps;
