import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { css } from '@fluentui/utilities';
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

  state.className = css(ToggleButtonClassNames.root, state.className, useToggleButtonStyles(state));
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = css(
    ToggleButtonClassNames.content,
    (state.content as any).className,
    useToggleButtonContentStyles(state),
  );
  (state.icon as any).className = css(
    ToggleButtonClassNames.icon,
    (state.icon as any).className,
    useToggleButtonIconStyles(state),
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderToggleButton(state);
});

ToggleButton.displayName = 'ToggleButton';
