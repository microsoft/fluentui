// eslint-disable-next-line import/no-extraneous-dependencies
import { Keys, Steps } from 'storywright';
import { alertDismissActionClassName } from '@fluentui/react-northstar';

const selectors = {
  dismissAction: `.${alertDismissActionClassName}`,
};

const screenerSteps = new Steps()
  .hover(selectors.dismissAction)
  .snapshot('Hovers the action button')
  .keys('body', Keys.tab)
  .snapshot('Focuses the action button')
  .hover(selectors.dismissAction)
  .snapshot('Hovers the focused action button')
  .end();

export default screenerSteps;
