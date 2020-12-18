import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import {
  useToggleButtonStyles,
  useToggleButtonContentStyles,
  useToggleButtonIconStyles,
  ToggleButtonClassNames,
} from './useToggleButtonClasses';
import { ToggleButtonProps } from './ToggleButton.types';

/**
 * Define a styled ToggleButton, using the `useToggleButton` hook.
 * {@docCategory Button}
 */
export const ToggleButton = React.forwardRef<HTMLElement, ToggleButtonProps>((props, ref) => {
  const state = useToggleButton(props, ref);

  state.className = useToggleButtonStyles(
    state,
    {
      componentName: 'Button',
      tokens: state.tokens,
    },
    ToggleButtonClassNames.root,
    state.className,
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useToggleButtonContentStyles(
    state,
    {
      tokens: state.tokens,
    },
    ToggleButtonClassNames.content,
    (state.content as any).className,
  );
  (state.icon as any).className = useToggleButtonIconStyles(
    state,
    {
      tokens: state.tokens,
    },
    ToggleButtonClassNames.icon,
    (state.icon as any).className,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
