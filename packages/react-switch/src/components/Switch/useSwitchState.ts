import * as React from 'react';
import { useControllableState, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import type { SwitchState } from './Switch.types';

export const useSwitchState = (state: SwitchState) => {
  const { defaultChecked = false, checked, disabled = false, onChange } = state.root;
  const { dir } = useFluent();
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

  const thumbWrapperStyles = {
    transform:
      dir === 'rtl'
        ? internalValue
          ? 'translate(-100%)'
          : 'translate(0%)'
        : internalValue
        ? 'translate(100%)'
        : 'translate(0%)',
  };

  // Input Props
  state.input.type = 'checkbox';
  state.input.onChange = onInputChange;
  state.input.checked = internalValue;
  state.input.disabled = disabled;
  state.input.ref = inputRef;

  // thumbContainer Props
  state.thumbWrapper.style = thumbWrapperStyles;

  return state;
};
