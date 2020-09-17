import { ScreenerStep, ScreenerSteps } from '@uifabric/build/screener';
import { alertDismissActionClassName } from '@fluentui/react-northstar';

const selectors = {
  dismissAction: `.${alertDismissActionClassName}`,
};

const focusDismissAction: ScreenerStep = (builder, keys) => builder.keys('body', keys.tab);

export const getFocusScreenerSteps = (): ScreenerSteps => [
  (builder, keys) =>
    focusDismissAction(builder, keys)
      .snapshot('Focuses the action button')
      .hover(selectors.dismissAction)
      .snapshot('Hovers the focused action button'),
];

export const getHoverScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(selectors.dismissAction).snapshot('Hovers the action button'),
];

export const getScreenerSteps = (): ScreenerSteps => [...getFocusScreenerSteps(), ...getHoverScreenerSteps()];
