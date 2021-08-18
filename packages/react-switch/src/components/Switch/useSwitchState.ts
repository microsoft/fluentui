import * as React from 'react';
import { useControllableState, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { SwitchSlots, SwitchState, SwitchCommon } from './Switch.types';

export const useSwitchState = (state: Pick<SwitchState, keyof SwitchCommon | keyof SwitchSlots | 'as' | 'ref'>) => {
  const { defaultChecked = false, checked, disabled = false, onChange } = state;
  const inputRef = useMergedRefs(state.input.ref);
  const [internalValue, setInternalValue] = useControllableState({
    defaultState: defaultChecked,
    state: checked,
    initialState: false,
  });

  const onInputChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(ev, { value: ev.target.checked });
    setInternalValue(ev.target.checked);
    inputRef?.current?.focus();
  });

  // Input Props
  state.input.type = 'checkbox';
  state.input.onChange = onInputChange;
  state.input.checked = internalValue;
  state.input.disabled = disabled;
  state.input.ref = inputRef;

  return state;
};
