import { Keys, Steps } from 'storywright';
import { buttonClassName } from '@fluentui/react-northstar';

const button = `.${buttonClassName}`;

const StoryWrightSteps = new Steps()
  .hover(button)
  .snapshot('Hovers the first button')
  .click(button)
  .snapshot('Clicks the first button')
  .keys(button, Keys.tab)
  .snapshot('Focuses on the second button')
  .end();

export default StoryWrightSteps;
