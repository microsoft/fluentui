import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { ToggleButtonProps } from './ToggleButton.types';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import {
  useToggleButtonStyles,
  useToggleButtonContentStyles,
  useToggleButtonIconStyles,
  ToggleButtonClassNames,
} from './useToggleButtonClasses';

/**
 * Define a styled ToggleButton, using the `useToggleButton` hook.
 * {@docCategory Button}
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const state = useToggleButton(props, ref);

  state.className = useToggleButtonStyles(state, {
    componentName: 'Button',
    classNames: [ToggleButtonClassNames.root, state.className],
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useToggleButtonContentStyles(state, {
    classNames: [ToggleButtonClassNames.content, (state.content as any).className],
  });
  (state.icon as any).className = useToggleButtonIconStyles(state, {
    classNames: [ToggleButtonClassNames.icon, (state.icon as any).className],
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
