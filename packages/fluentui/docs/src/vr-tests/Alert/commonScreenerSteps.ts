// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'screener-storybook/src/screener';
import { alertDismissActionClassName } from '@fluentui/react-northstar';

const selectors = {
  dismissAction: `.${alertDismissActionClassName}`,
};
const tab = '\uE004';

export const getFocusScreenerSteps = new Steps()
  .keys('body', tab)
  .snapshot('Focuses the action button')
  .hover(selectors.dismissAction)
  .snapshot('Hovers the focused action button');

export const getHoverScreenerSteps = new Steps().hover(selectors.dismissAction).snapshot('Hovers the action button');
