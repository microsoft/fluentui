import { Alert } from '@fluentui/react';

const selectors = {
  dismissAction: `.${Alert.slotClassNames.dismissAction}`
};

const focusDismissAction: ScreenerStep = (builder, keys) => builder.keys('body', keys.tab);

export const getFocusScreenerSteps = (): ScreenerSteps => [
  (builder, keys) => focusDismissAction(builder, keys).snapshot('Focuses the action button')
];

export const getHoverScreenerSteps = (): ScreenerSteps => [
  builder => builder.hover(selectors.dismissAction).snapshot('Hovers the action button')
];

export const getScreenerSteps = (): ScreenerSteps => [...getFocusScreenerSteps(), ...getHoverScreenerSteps()];
