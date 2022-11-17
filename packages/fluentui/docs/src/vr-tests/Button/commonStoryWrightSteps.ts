// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'storywright';
import { buttonClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities/utils';

const button = `.${buttonClassName}`;

const StoryWrightSteps = new Steps()
  .hover(button)
  .snapshot('Hovers the first button')
  .click(button)
  .snapshot('Clicks the first button')
  .keys(button, keys.tab)
  .snapshot('Focuses on the second button')
  .end();

export default StoryWrightSteps;
