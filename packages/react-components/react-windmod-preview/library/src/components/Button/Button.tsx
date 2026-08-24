'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderButton, useButton, useButtonContext } from '@fluentui/react-headless-components-preview/button';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { ButtonProps } from './Button.types';
import { useButtonStyles } from './useButtonStyles';

/**
 * Buttons give people a way to trigger an action. Windmod Button: the headless button
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useButton, ButtonContext read included: a
  // container like MessageBarActions publishes `size`, and Griffel resolves it as
  // `size = contextSize ?? 'medium'` (react-button useButton.ts:19-20). The context is Griffel's
  // own instance, re-exported by headless, because the provider is Griffel's too.
  const {
    appearance = 'secondary',
    shape = 'rounded',
    size = 'medium',
    ...rest
  } = mergeContextProps(useButtonContext(), props);

  return renderButton(
    useButtonStyles({
      ...useButton(rest, ref),
      appearance,
      shape,
      size,
    }),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
