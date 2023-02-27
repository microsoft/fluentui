import { Keys, Steps } from 'storywright';
import { checkboxClassName } from '@fluentui/react-northstar';

const StoryWrightSteps = new Steps()
  .click(`.${checkboxClassName}`)
  .snapshot('Checks checkbox')
  .keys('body', Keys.tab)
  .snapshot('Focuses checkbox')
  .end();

export default StoryWrightSteps;
