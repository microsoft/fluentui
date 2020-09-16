import { menuClassName } from '@fluentui/react-northstar';
import { ScreenerSteps } from '@uifabric/build/screener';

interface StepsOptions {
  vertical?: boolean;
  startItem?: number;
  endItem?: number;
}

export const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

const getScreenerSteps = ({ vertical, startItem = 2, endItem = 3 }: StepsOptions = {}): ScreenerSteps => [
  (builder, keys) =>
    builder
      .hover(selectors.item(startItem))
      .snapshot('Hovers 2nd item (hover state styles)')
      .click(selectors.item(startItem))
      .snapshot('Clicks on 2nd item (active state styles)')
      .keys(selectors.item(startItem), vertical ? keys.downArrow : keys.rightArrow)
      .snapshot('Navigates to next item (focus state styles)')
      .keys(selectors.item(endItem), vertical ? keys.upArrow : keys.leftArrow)
      .snapshot('Navigates to previous item (active and focus state styles)'),
];

export default getScreenerSteps;
