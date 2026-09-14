'use client';

import type * as React from 'react';
import { useCompoundButtonBase_unstable } from '@fluentui/react-button';

import { toDataAttributeValue } from '../../utils';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';

/**
 * Returns the state for a CompoundButton component, given its props and ref.
 */
export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonState => {
  const state: CompoundButtonState = useCompoundButtonBase_unstable(props, ref);
  const hasSecondaryContent = Boolean(!state.iconOnly && state.secondaryContent);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-has-secondary-content'] = toDataAttributeValue(hasSecondaryContent);

  return state;
};
