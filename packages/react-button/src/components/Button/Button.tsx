import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButton } from './useButton';
import {
  useButtonStyles,
  // useStaticButtonStyles,
  useButtonContentStyles,
  // useStaticButtonContentStyles,
  useButtonIconStyles,
  // useStaticButtonIconStyles,
  ButtonClassNames,
} from './useButtonClasses';

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  state.className = useButtonStyles(state, {
    componentName: 'Button',
    classNames: [ButtonClassNames.root, state.className],
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (state.content as any).className = useButtonContentStyles(state, {
    classNames: [ButtonClassNames.content, (state.content as any).className],
  });
  (state.icon as any).className = useButtonIconStyles(state, {
    classNames: [ButtonClassNames.icon, (state.icon as any).className],
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
