'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCompoundButton, useCompoundButton } from '@fluentui/react-headless-components-preview/compound-button';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';

import { mergeContextProps } from '../../utils/mergeContextProps';
import type { CompoundButtonProps } from './CompoundButton.types';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';

/**
 * A CompoundButton pairs an action with a second line describing it. Windmod CompoundButton: the
 * headless compound button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useCompoundButton, which reads the same
  // ButtonContext Button does (react-button useCompoundButton.ts:50-51).
  const context = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = 'medium', ...rest } = mergeContextProps(context, props);

  const state = useCompoundButton(rest, ref);
  const styled = useCompoundButtonStyles({
    ...state,
    appearance,
    shape,
    size,
  });

  return renderCompoundButton(styled);
});

CompoundButton.displayName = 'CompoundButton';
