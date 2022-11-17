// eslint-disable-next-line import/no-extraneous-dependencies
import { Keys, Steps } from 'storywright';
import { sliderSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  input: `.${sliderSlotClassNames.input}`,
};

export const focusSliderSteps = new Steps().Keys('body', Keys.tab).end();

export const rightArrowSteps = new Steps()
  .Keys('body', Keys.tab)
  .Keys(selectors.input, Keys.rightArrow)
  .Keys(selectors.input, Keys.rightArrow)
  .Keys(selectors.input, Keys.rightArrow)
  .Keys(selectors.input, Keys.rightArrow)
  .Keys(selectors.input, Keys.rightArrow)
  .snapshot('Navigates to the right with the right arrow key')
  .end();

export const upArrowSteps = new Steps()
  .Keys('body', Keys.tab)
  .Keys(selectors.input, Keys.upArrow)
  .Keys(selectors.input, Keys.upArrow)
  .Keys(selectors.input, Keys.upArrow)
  .Keys(selectors.input, Keys.upArrow)
  .Keys(selectors.input, Keys.upArrow)
  .snapshot('Navigates to the right with the up arrow key')
  .end();
