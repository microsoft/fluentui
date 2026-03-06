import * as React from 'react';
import { FluentProvider } from '@fluentui/react-components';
import type { FluentProviderCustomStyleHooks } from '@fluentui/react-components';
import type { ButtonState, MenuButtonState, SplitButtonState, ToggleButtonState } from '@fluentui/react-components';
import { STYLE_MODE_ID } from '@fluentui/react-storybook-addon';
import { useCapButtonStyles } from './useCapButtonStyles';
import { useCapMenuButtonStyles } from './useCapMenuButtonStyles';
import { useCapSplitButtonStyles } from './useCapSplitButtonStyles';
import { useCapToggleButtonStyles } from './useCapToggleButtonStyles';

const capStyleHooks: FluentProviderCustomStyleHooks = {
  useButtonStyles_unstable: state => useCapButtonStyles(state as ButtonState),
  useCompoundButtonStyles_unstable: state => useCapButtonStyles(state as ButtonState),
  useMenuButtonStyles_unstable: state => useCapMenuButtonStyles(state as MenuButtonState),
  useToggleButtonStyles_unstable: state => useCapToggleButtonStyles(state as ToggleButtonState),
  useSplitButtonStyles_unstable: state => useCapSplitButtonStyles(state as SplitButtonState),
};

export const withCAPTheme = (
  StoryFn: () => React.ReactElement,
  context: { globals: Record<string, string> },
): React.ReactElement => {
  const styleMode = context.globals[STYLE_MODE_ID] ?? 'fluent';
  const story = StoryFn();

  if (styleMode === 'cap') {
    return <FluentProvider customStyleHooks_unstable={capStyleHooks}>{story}</FluentProvider>;
  }

  return story;
};
