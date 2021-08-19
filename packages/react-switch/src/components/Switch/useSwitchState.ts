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

  const setChecked = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, incomingValue: boolean) => {
      onChange?.(ev, { checked: incomingValue });
      setInternalValue(incomingValue);
    },
    [onChange, setInternalValue],
  );

  const userOnChange = state.input.onChange;

  const onInputChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    userOnChange?.(ev);
    setChecked(ev, ev.currentTarget.checked);
  });

  // Input Props
  state.input.type = 'checkbox';
  state.input.onChange = onInputChange;
  state.input.checked = internalValue;
  state.input.disabled = disabled;
  state.input.ref = inputRef;

  // thumbContainer Props
  state.thumbContainer.style = { transform: internalValue ? 'translate(100%)' : 'translate(0%)' };

  return state;
};
