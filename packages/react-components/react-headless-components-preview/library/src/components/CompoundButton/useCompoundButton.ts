'use client';

import type * as React from 'react';
import { useCompoundButtonBase_unstable } from '@fluentui/react-button';

import { stringifyDataAttribute } from '../../utils';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';

/**
 * Returns the state for a CompoundButton component, given its props and ref.
 */
export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonState => {
  const baseState = useCompoundButtonBase_unstable(props, ref);
  const hasSecondaryContent = Boolean(!baseState.iconOnly && baseState.secondaryContent);

  return {
    ...baseState,
    root: {
      ...baseState.root,
      // Applied after consumer props so reserved state attributes cannot be misrepresented.
      'data-disabled': stringifyDataAttribute(baseState.disabled),
      'data-disabled-focusable': stringifyDataAttribute(baseState.disabledFocusable),
      'data-icon-only': stringifyDataAttribute(baseState.iconOnly),
      'data-has-secondary-content': stringifyDataAttribute(hasSecondaryContent),
    },
  };
};
