/* eslint-disable import/no-extraneous-dependencies */
import { Keys, Steps } from 'storywright';
import { attachmentClassName, attachmentActionClassName } from '@fluentui/react-northstar';

const selectors = {
  root: `.${attachmentClassName}`,
  action: `.${attachmentActionClassName}`,
};

const StoryWrightSteps = new Steps()
  .hover(selectors.root)
  .snapshot('Hovers root')
  .keys('body', Keys.tab)
  .snapshot('Focuses root')
  .hover(selectors.action)
  .snapshot('Hovers action')
  .keys('body', Keys.tab)
  .keys('body', Keys.tab)
  .snapshot('Focuses action')
  .end();

export default StoryWrightSteps;
