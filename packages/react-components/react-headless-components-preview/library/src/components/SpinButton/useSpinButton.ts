'use client';

import * as React from 'react';
import { useSpinButtonBase_unstable } from '@fluentui/react-spinbutton';
import { mergeCallbacks, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a SpinButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderSpinButton`.
 */
export const useSpinButton = (props: SpinButtonProps, ref: React.Ref<HTMLInputElement>): SpinButtonState => {
  const state: SpinButtonState = useSpinButtonBase_unstable(props, ref);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergedInputRef = useMergedRefs(state.input.ref, inputRef);
  const focusInput = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current?.focus();
  });

  // Set data attributes for disabled, read-only, spin direction, and bound states to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.input.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-readonly'] = toDataAttributeValue(state.input.readOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-spin-state'] = state.spinState !== 'rest' ? state.spinState : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-at-bound'] = state.atBound !== 'none' ? state.atBound : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invalid'] = toDataAttributeValue(state.input['aria-invalid']);

  /* eslint-disable react-hooks/immutability -- intentional: keep the input focused and expose its resolved semantics */
  state.input.ref = mergedInputRef;
  state.input.inputMode ??= 'decimal';
  state.input['aria-readonly'] ??= state.input.readOnly;
  state.incrementButton.onMouseDown = mergeCallbacks(focusInput, state.incrementButton.onMouseDown);
  state.decrementButton.onMouseDown = mergeCallbacks(focusInput, state.decrementButton.onMouseDown);
  /* eslint-enable react-hooks/immutability */

  return state;
};
