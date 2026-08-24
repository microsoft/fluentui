'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCompoundButton, useCompoundButton } from '@fluentui/react-headless-components-preview/compound-button';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';

/**
 * A CompoundButton pairs an action with a second line describing it. Windmod CompoundButton: the
 * headless compound button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useCompoundButton, which reads the same
  // ButtonContext Button does (react-button useCompoundButton.ts:50-51).
  const {
    appearance = 'secondary',
    shape = 'rounded',
    size = 'medium',
    ...rest
  } = mergeContextProps(useButtonContext(), props);

  const state: CompoundButtonState = {
    ...useCompoundButton(rest, ref),
    appearance,
    shape,
    size,
  };

  return renderCompoundButton(useCompoundButtonStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<CompoundButtonProps>;

CompoundButton.displayName = 'CompoundButton';
