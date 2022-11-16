// eslint-disable-next-line import/no-extraneous-dependencies
import { Steps } from 'storywright';
import { menuClassName } from '@fluentui/react-northstar';
import { keys } from '../utilities';

export const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const getStoryWrightSteps = ({ vertical = false, startItem = 2, endItem = 3 }) =>
  new Steps()
    .hover(selectors.item(startItem))
    .snapshot('Hovers 2nd item (hover state styles)')
    .click(selectors.item(startItem))
    .snapshot('Clicks on 2nd item (active state styles)')
    .keys(selectors.item(startItem), vertical ? keys.downArrow : keys.rightArrow)
    .snapshot('Navigates to next item (focus state styles)')
    .keys(selectors.item(endItem), vertical ? keys.upArrow : keys.leftArrow)
    .snapshot('Navigates to previous item (active and focus state styles)')
    .end();

export default getStoryWrightSteps;
